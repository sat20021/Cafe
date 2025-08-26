/**
 * Mobilolite Chat Widget v2.0.0
 * A standalone chat interface that renders itself automatically
 * Usage: <script src="path/to/mobilolite.js"></script>
 */

(function() {
    'use strict';

    // Prevent multiple initializations
    if (window.MobiloliteWidget) {
        return;
    }

    // Configuration options (can be overridden via window.MobiloliteConfig)
    const DEFAULT_CONFIG = {
        position: 'bottom-right', // 'bottom-right', 'bottom-left', 'center', 'fullscreen'
        theme: 'default', // 'default', 'dark', 'light'
        userName: 'The Eco-Friendly Cake Café',
        userStatus: 'Online',
        autoOpen: true,
        minimizable: true,
        title: 'The Eco-Friendly Cake Café Assistant',
        subtitle: 'How can we help you today?',
        welcomeMessage: 'Hello! Welcome to The Eco-Friendly Cake Café. How can we help you?',
        // Local brand assets
        brandLogoPath: '/icons/bela-logo.svg',
        // Force local theme to take precedence over API theme
        forceLocalTheme: true,
        // Force local branding (name and logo) to override API-provided values
        forceLocalBrand: true,
        // Teaser bubble config
        teaserEnabled: true,
        teaserDelayMs: 2500,
        teaserTextLine1: 'Hi, how are you doing?',
        teaserTextLine2: 'Can I help you with anything?',
        apiEndpoints: {
            baseUrl: 'https://py-aiagent.mobiloitte.io',
            widgetDetails: '/customize/widget/gdgfhfgh652'
          }
    };

    // Function to generate CSS with dynamic colors
    function generateCSS(colors = {}) {
        // Softer cafe-themed defaults (pastel, lower contrast). API theme overrides these unless forceLocalTheme is true.
        const color1 = colors['color-1'] || '#FAF3E8'; // very light cream
        const color2 = colors['color-2'] || '#C7A17A'; // soft latte accent
        const color3 = colors['color-3'] || '#EADBC8'; // light beige chat background
        const color4 = colors['color-4'] || '#4A3B2A'; // soft dark for text/headers
        const color5 = colors['color-5'] || '#5A4632'; // bubble background (still readable)
       
        return `
        .mobilolite-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999998;
            display: none;
            align-items: center;
            justify-content: center;
        }

        .mobilolite-badge {
            display: inline-block;
            margin-left: 8px;
            padding: 2px 8px;
            border-radius: 9999px;
            background: ${color1};
            color: ${color5};
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .3px;
            vertical-align: middle;
            white-space: nowrap;
        }

        .mobilolite-overlay.active {
            display: flex;
        }

        .mobilolite-widget {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            width: 100%;
            max-width: 400px;
            height: 600px;
            background: ${color3};
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 999999;
        }

        .mobilolite-widget.position-bottom-right {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 380px;
            height: 580px;
            z-index: 999999;
        }

        .mobilolite-widget.position-bottom-left {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 380px;
            height: 580px;
            z-index: 999999;
        }

        .mobilolite-widget.position-fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            max-width: none;
            border-radius: 0;
            z-index: 999999;
        }

        .mobilolite-widget.minimized {
            width: 60px !important;
            height: 60px !important;
            border-radius: 50% !important;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            max-width: 60px !important;
            max-height: 60px !important;
            background: linear-gradient(135deg, ${color2} 0%, ${color3} 100%);
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 999997;
        }

        .mobilolite-widget.minimized:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 6px 25px rgba(0,0,0,0.3);
        }

        .mobilolite-widget.minimized .mobilolite-header {
            width: 100%;
            height: 100%;
            padding: 0;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
        }

        .mobilolite-widget.minimized .mobilolite-user-info {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }

        .mobilolite-widget.minimized .mobilolite-avatar {
            width: 40px;
            height: 40px;
            font-size: 20px;
        }

        .mobilolite-widget.minimized .mobilolite-user-details,
        .mobilolite-widget.minimized .mobilolite-header-icons,
        .mobilolite-widget.minimized .mobilolite-chat-area,
        .mobilolite-widget.minimized .mobilolite-input-area {
            display: none !important;
        }

        .mobilolite-widget.expanded {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 90vw !important;
            height: 90vh !important;
            max-width: 1200px !important;
            max-height: 800px !important;
            border-radius: 12px !important;
            z-index: 999999 !important;
            transition: all 0.3s ease !important;
        }

        .mobilolite-widget.expanded .mobilolite-chat-area {
            flex: 1;
            overflow-y: auto;
        }

        .mobilolite-widget.expanded .mobilolite-cross-btn {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
        }

        .mobilolite-header {
            background: ${color2};
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            min-height: 60px;
            box-sizing: border-box;
        }

        .mobilolite-user-info {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
        }

        .mobilolite-avatar {
            width: 32px;
            height: 32px;
            background: ${color4};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            font-weight: bold;
        }

        .mobilolite-user-details h3 {
            margin: 0;
            color: ${color4};
            font-size: 16px;
            font-weight: 600;
        }

        .mobilolite-user-details p {
            margin: 0;
            color: ${color4};
            font-size: 12px;
            opacity: 0.8;
        }

        .mobilolite-header-icons {
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
        }

        .mobilolite-icon {
            width: 20px;
            height: 20px;
            color: ${color4};
            cursor: pointer;
            opacity: 0.7;
            transition: all 0.2s;
            padding: 4px;
            border-radius: 4px;
        }

        .mobilolite-icon:hover {
            opacity: 1;
            background-color: rgba(255, 255, 255, 0.1);
            transform: scale(1.1);
        }

        .mobilolite-icon:active {
            transform: scale(0.95);
        }

        .mobilolite-icon.active {
            background-color: rgba(255, 255, 255, 0.2);
            opacity: 1;
        }





        .mobilolite-cross-btn {
            background: none;
            border: none;
            color: ${color4};
            cursor: pointer;
            font-size: 18px;
            opacity: 0.8;
            transition: all 0.2s;
            padding: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 4px;
            margin-left: 4px;
        }

        .mobilolite-cross-btn:hover {
            opacity: 1;
            // background-color: rgba(255, 255, 255, 0.1);
            transform: scale(1.05);
        }

        .mobilolite-cross-btn svg {
            width: 20px;
            height: 20px;
            // fill: currentColor;
        }

        .mobilolite-close-btn {
            background: none;
            border: none;
            color: ${color4};
            cursor: pointer;
            font-size: 18px;
            opacity: 0.7;
            transition: opacity 0.2s;
            padding: 4px;
            margin-left: 8px;
        }

        .mobilolite-close-btn:hover {
            opacity: 1;
        }

        .mobilolite-chat-area {
            flex: 1;
            background: ${color3};
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .mobilolite-message {
            display: flex;
            gap: 12px;
            align-items: flex-start;
        }

        .mobilolite-message.user {
            flex-direction: row-reverse;
        }

        .mobilolite-message-avatar {
            width: 28px;
            height: 28px;
            background: ${color1};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .mobilolite-message.user .mobilolite-message-avatar {
            background: ${color1};
        }

        .mobilolite-message-content {
            flex: 1;
            max-width: 70%;
        }

        .mobilolite-message-bubble {
            background: ${color5};
            color: ${color1};
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.4;
            word-wrap: break-word;
        }

        .mobilolite-message.user .mobilolite-message-bubble {
            background: ${color1};
            color: ${color5};
        }

        .mobilolite-message-time {
            font-size: 11px;
            color: ${color5};
            margin-top: 4px;
            text-align: left;
        }

        .mobilolite-message.user .mobilolite-message-time {
            text-align: right;
        }

        .mobilolite-input-area {
            background: ${color2};
            padding: 16px 20px;
            display: flex;
            gap: 12px;
            align-items: center;
            border-top: 1px solid rgba(255,255,255,0.1);
        }

        .mobilolite-input {
            flex: 1;
            background: ${color1};
            border: none;
            border-radius: 24px;
            padding: 12px 16px;
            font-size: 14px;
            outline: none;
            color: ${color5};
        }

        .mobilolite-input::placeholder {
            color: #95a5a6;
        }

        .mobilolite-send-btn {
            background: ${color1};
            border: none;
            border-radius: 24px;
            padding: 12px 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${color5};
            font-weight: 500;
            font-size: 14px;
            transition: all 0.2s;
        }

        .mobilolite-send-btn:hover {
            background: ${color2};
            transform: scale(1.02);
        }

        .mobilolite-send-btn:active {
            transform: scale(0.98);
        }

        .mobilolite-fab {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, ${color2} 0%, ${color3} 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 999997;
            transition: all 0.3s ease;
            color: white;
            font-size: 24px;
        }

        /* Keep FAB fixed and visible over page scroll */
        .mobilolite-fab, .mobilolite-widget.position-bottom-right, .mobilolite-widget.position-bottom-left {
            position: fixed;
        }

        /* Teaser bubble */
        .mobilolite-teaser {
            position: fixed;
            right: 90px;
            bottom: 28px;
            max-width: 240px;
            background: ${color2};
            color: ${color1};
            border-radius: 16px;
            padding: 10px 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.18);
            display: none;
            align-items: flex-start;
            gap: 8px;
            z-index: 999996;
        }
        .mobilolite-teaser.active { display: flex; animation: mobilolite-pop .2s ease-out; }
        .mobilolite-teaser:after {
            content: '';
            position: absolute;
            right: -8px;
            bottom: 14px;
            width: 0; height: 0;
            border-left: 10px solid ${color2};
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            filter: drop-shadow(0 2px 2px rgba(0,0,0,0.08));
        }
        .mobilolite-teaser-icon {
            width: 18px; height: 18px;
            flex-shrink: 0;
            display: inline-flex; align-items: center; justify-content: center;
            background: ${color1}; color: ${color5};
            border-radius: 50%; font-size: 12px;
        }
        .mobilolite-teaser-text { line-height: 1.2; font-size: 13px; }
        .mobilolite-teaser-close { margin-left: 8px; cursor: pointer; opacity: .9; }
        .mobilolite-teaser-close:hover { opacity: 1; }
        @keyframes mobilolite-pop { from { transform: translateY(6px); opacity: .0; } to { transform: translateY(0); opacity: 1; } }

        .mobilolite-fab:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(0,0,0,0.3);
        }

        .mobilolite-fab.hidden {
            display: none;
        }

        /* Form Styles */
        .mobilolite-form-container {
            background: ${color2};
            color: ${color1};
            border-radius: 0.5rem 0.5rem 0.5rem 0.25rem;
            padding: 0.75rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
            max-width: 100%;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobilolite-form-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobilolite-form-header h3 {
            margin: 0;
            font-size: 1rem;
            font-weight: 700;
            color: ${color4};
        }

        .mobilolite-form-close {
            background: none;
            border: none;
            color: ${color1};
            cursor: pointer;
            font-size: 1rem;
            padding: 0.1rem;
            border-radius: 50%;
            transition: background-color 0.2s;
        }

        .mobilolite-form-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        .mobilolite-form {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .mobilolite-form-field {
            display: flex;
            flex-direction: column;
            margin-bottom: 0.25rem;
        }

        .mobilolite-form-field label {
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
            color: ${color4};
            display: block;
        }

        .mobilolite-form-field input,
        .mobilolite-form-field select,
        .mobilolite-form-field textarea {
            width: 100%;
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
            border: 1px solid ${color3};
            border-radius: 0.35rem;
            background-color: ${color1};
            color: ${color5};
            outline: none;
            transition: all 0.2s ease;
            box-sizing: border-box;
            min-height: 28px;
        }

        .mobilolite-form-field input:focus,
        .mobilolite-form-field select:focus,
        .mobilolite-form-field textarea:focus {
            border-color: ${color4};
            box-shadow: 0 0 0 2px rgba(49, 87, 44, 0.08);
            background-color: white;
        }

        .mobilolite-form-field input::placeholder,
        .mobilolite-form-field textarea::placeholder {
            color: #9ca3af;
            opacity: 0.8;
        }

        .mobilolite-form-field textarea {
            resize: none;
            min-height: 2.5rem;
            line-height: 1.3;
        }

        .mobilolite-form-toggle {
            display: flex;
            gap: 0.25rem;
            margin-bottom: 0.25rem;
        }

        .mobilolite-toggle-btn {
            padding: 0.15rem 0.5rem;
            border-radius: 9999px;
            border: 1px solid #e5e7eb;
            font-weight: 500;
            font-size: 0.75rem;
            transition: all 0.2s;
            cursor: pointer;
            background-color: white;
            color: ${color4};
        }

        .mobilolite-toggle-btn.active {
            background-color: ${color1};
            color: ${color5};
            border-color: ${color3};
        }

        .mobilolite-password-field {
            position: relative;
        }

        .mobilolite-password-toggle {
            position: absolute;
            right: 0.25rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            padding: 0.1rem;
            font-size: 0.85rem;
        }

        .mobilolite-file-upload {
            position: relative;
            border: 1px dashed #d1d5db;
            border-radius: 0.35rem;
            padding: 0.5rem;
            text-align: center;
            transition: border-color 0.2s;
        }

        .mobilolite-file-upload:hover {
            border-color: #3b82f6;
        }

        .mobilolite-file-upload input[type="file"] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .mobilolite-file-placeholder span {
            font-size: 1.1rem;
            display: block;
            margin-bottom: 0.1rem;
        }
        .mobilolite-file-placeholder p {
            font-size: 0.65rem;
            color: #6b7280;
            margin: 0;
        }
        .mobilolite-file-placeholder small {
            font-size: 0.65rem;
            color: #9ca3af;
            margin-top: 0.1rem;
            display: block;
        }

        .mobilolite-form-buttons {
            display: flex;
            gap: 0.25rem;
            padding-top: 0.5rem;
            margin-top: 0.25rem;
        }

        .mobilolite-form-buttons button {
            flex: 1;
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
            border-radius: 0.35rem;
            font-weight: 600;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
        }

        .mobilolite-form-buttons button[type="button"] {
            background: none;
            border: 1px solid ${color4};
            color: ${color4};
        }

        .mobilolite-form-buttons button[type="button"]:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .mobilolite-form-submit {
            width: 100%;
            padding: 0.5rem 1rem;
            border-radius: 0.35rem;
            font-weight: 600;
            transition: all 0.2s ease;
            cursor: pointer;
            background-color: ${color1};
            color: ${color5};
            border: none;
            margin-top: 0.25rem;
            font-size: 0.75rem;
        }

        .mobilolite-form-submit:hover {
            background-color: ${color2};
            transform: translateY(-1px);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.10);
        }

        .mobilolite-form-submit:active {
            transform: translateY(0);
        }

        .mobilolite-powered-by {
            text-align: center;
            font-size: 11px;
            color: ${color4};
            background: ${color2};
            margin-top: 2px;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
            font-family: inherit;
            border-radius: 6px;
            padding: 4px 0;
        }



        @media (max-width: 480px) {
            .mobilolite-widget.position-bottom-right,
            .mobilolite-widget.position-bottom-left {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                border-radius: 0;
                max-width: none;
            }

            .mobilolite-overlay {
                display: none !important;
            }
        }
    `;
    }

    // SVG Icons matching the preview
    const ICONS = {
        chat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',
        user: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
        briefcase: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>',
        customer: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v4"/><path d="M8 23h8"/></svg>',
        employee: '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M256.008,411.524c54.5,0,91.968-7.079,92.54-13.881c2.373-28.421-34.508-43.262-49.381-48.834c-7.976-2.984-19.588-11.69-19.588-17.103c0-3.587,0-8.071,0-14.214c4.611-5.119,8.095-15.532,10.183-27.317c4.857-1.738,7.627-4.524,11.095-16.65c3.69-12.93-5.548-12.5-5.548-12.5c7.468-24.715-2.357-47.944-18.825-46.246c-11.358-19.857-49.397,4.54-61.31,2.841c0,6.818,2.834,11.92,2.834,11.92c-4.143,7.882-2.548,23.564-1.389,31.485c-0.667,0-9.016,0.079-5.468,12.5c3.452,12.126,6.23,14.912,11.088,16.65c2.079,11.786,5.571,22.198,10.198,27.317c0,6.143,0,10.627,0,14.214c0,5.413-12.35,14.548-19.611,17.103c-14.953,5.262-51.746,20.413-49.373,48.834C164.024,404.444,201.491,411.524,256.008,411.524z"/><path d="M404.976,56.889h-75.833v16.254c0,31.365-25.524,56.889-56.889,56.889h-32.508c-31.366,0-56.889-25.524-56.889-56.889V56.889h-75.834c-25.444,0-46.071,20.627-46.071,46.071v362.969c0,25.444,20.627,46.071,46.071,46.071h297.952c25.445,0,46.072-20.627,46.072-46.071V102.96C451.048,77.516,430.421,56.889,404.976,56.889z M402.286,463.238H109.714V150.349h292.572V463.238z"/><path d="M239.746,113.778h32.508c22.405,0,40.635-18.23,40.635-40.635V40.635C312.889,18.23,294.659,0,272.254,0h-32.508c-22.406,0-40.635,18.23-40.635,40.635v32.508C199.111,95.547,217.341,113.778,239.746,113.778z M231.619,40.635c0-4.492,3.634-8.127,8.127-8.127h32.508c4.492,0,8.127,3.635,8.127,8.127v16.254c0,4.492-3.635,8.127-8.127,8.127h-32.508c-4.493,0-8.127-3.635-8.127-8.127V40.635z"/></svg>',
        minimize: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',
        close: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
        expand: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
        contract: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',
        cross: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
    };

    // Widget Class
    class MobiloliteWidget {
        constructor(options = {}) {
            this.config = { ...DEFAULT_CONFIG, ...(window.MobiloliteConfig || {}), ...options };
            this.messages = [];
            this.isMinimized = !this.config.autoOpen;
            this.isExpanded = false;
            this.container = null;
            this.overlay = null;
            this.fab = null;
            this.teaser = null;
            this.widgetData = null;
            this.activeForm = null; // Track which form is currently open
            this.userLoginType = null; // Track user login type: 'customer' or 'employee'
            this.authToken = null; // Store authentication token
            this.allowedDomains = []; // Store allowed domains for the user
            this.sessionId = Date.now().toString(); // Generate session ID once that persists until page refresh
            this.leadsOptions = []; // Store leads options from API
            this.jobCategories = []; // Store job categories from API
            this.jobExperiences = []; // Store job experiences from API
            this.ensureFixedPositions = this.ensureFixedPositions?.bind(this) || (()=>{});
            this.init();
        }

        // Update the init method for better timing control
        async init() {
            console.log('Initializing Mobilolite Widget...');
           
            // Step 1: Inject default styles first
            this.injectStyles();
            console.log('Default styles injected');
           
            // Step 2: Create DOM elements
            this.createElements();
            console.log('DOM elements created');
           
            // Step 3: Load widget data and apply theme
            await this.loadWidgetData();
            console.log('Widget data loaded');
           
            // Step 4: Render with updated data
            this.render();
            console.log('Widget rendered');
           
            // Step 5: Bind events
            this.bindEvents();
            console.log('Events bound');
           
            // Step 6: Re-apply theme colors after everything is rendered (safety net)
            if (!this.config.forceLocalTheme && this.widgetData && this.widgetData.theme) {
                setTimeout(() => {
                    console.log('Re-applying theme colors as safety measure');
                    this.updateStyles(this.widgetData.theme);
                }, 500);
            }
        }

        // Also update the loadWidgetData method to ensure proper timing
        async loadWidgetData() {
            try {
                console.log('Loading widget data from:', `${this.config.apiEndpoints.baseUrl}${this.config.apiEndpoints.widgetDetails}`);
               
                const response = await fetch(`${this.config.apiEndpoints.baseUrl}${this.config.apiEndpoints.widgetDetails}`);
                this.widgetData = await response.json();
               
                console.log('Raw widget data received:', this.widgetData);
               
                // Update config with loaded data (respect local branding if forced)
                if (!this.config.forceLocalBrand) {
                    this.config.userName = this.widgetData.Name || this.config.userName;
                    this.config.welcomeMessage = this.widgetData.Welcome_message || this.config.welcomeMessage;
                }
               
                // Apply theme colors with option to force local theme
                const localTheme = (this.config && typeof this.config.theme === 'object') ? this.config.theme : undefined;
                if (this.config.forceLocalTheme) {
                    console.log('🎨 Using forced local theme (ignoring API theme)');
                    await new Promise(resolve => setTimeout(resolve, 50));
                    this.updateStyles(localTheme || {});
                } else if (this.widgetData.theme && typeof this.widgetData.theme === 'object') {
                    console.log('🎨 API theme colors found:', this.widgetData.theme);
                    await new Promise(resolve => setTimeout(resolve, 100));
                    this.updateStyles(this.widgetData.theme);
                } else {
                    console.warn('⚠️ No theme colors in API response - using defaults');
                    this.updateStyles(localTheme || {});
                }
               
                // Load leads options
                await this.loadLeadsOptions();
               
                // Load job options
                await this.loadJobOptions();
               
                // Set initial messages
                this.messages = [
                    {
                        type: 'bot',
                        content: this.config.welcomeMessage,
                        time: this.getCurrentTime(),
                        isWelcome: true
                    }
                ];
               
                console.log('Widget data loaded successfully');
            } catch (error) {
                console.error('Failed to load widget data:', error);
                // Fallback to default messages
                this.messages = [
                    {
                        type: 'bot',
                        content: this.config.welcomeMessage,
                        time: this.getCurrentTime(),
                        isWelcome: true
                    }
                ];
            }
        }

        // Method to load leads options from API
        async loadLeadsOptions() {
            try {
                console.log('Loading leads options from API...');
               
                const response = await fetch('https://py-aiagent.mobiloitte.io/api/v1/leads/options', {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                this.leadsOptions = await response.json();
                console.log('Leads options loaded successfully:', this.leadsOptions);
               
            } catch (error) {
                console.error('Failed to load leads options:', error);
                this.leadsOptions = []; // Fallback to empty array
            }
        }

        // Method to load job options from API
        async loadJobOptions() {
            try {
                console.log('Loading job categories from API...');
               
                // Load job categories
                const categoriesResponse = await fetch('https://py-aiagent.mobiloitte.io/api/v1/jobs/categories', {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json'
                    }
                });

                if (categoriesResponse.ok) {
                    this.jobCategories = await categoriesResponse.json();
                    console.log('Job categories loaded successfully:', this.jobCategories);
                } else {
                    console.warn('Failed to load job categories:', categoriesResponse.status);
                    this.jobCategories = [];
                }

                // Load job experiences
                console.log('Loading job experiences from API...');
                const experiencesResponse = await fetch('https://py-aiagent.mobiloitte.io/api/v1/jobs/experiences', {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json'
                    }
                });

                if (experiencesResponse.ok) {
                    this.jobExperiences = await experiencesResponse.json();
                    console.log('Job experiences loaded successfully:', this.jobExperiences);
                } else {
                    console.warn('Failed to load job experiences:', experiencesResponse.status);
                    this.jobExperiences = [];
                }
               
            } catch (error) {
                console.error('Failed to load job options:', error);
                this.jobCategories = []; // Fallback to empty array
                this.jobExperiences = []; // Fallback to empty array
            }
        }

        injectStyles() {
            if (!document.getElementById('mobilolite-styles')) {
                const style = document.createElement('style');
                style.id = 'mobilolite-styles';
                // Use default colors initially, will be updated when API data loads
                style.textContent = generateCSS();
                document.head.appendChild(style);
                console.log('Initial styles injected with default colors');
            }
        }

        // Replace the existing updateStyles method with this improved version
        updateStyles(colors) {
            // Ensure DOM is ready before updating styles
            const updateStylesImmediate = () => {
                let style = document.getElementById('mobilolite-styles');
                if (!style) {
                    // If style element doesn't exist, create it
                    style = document.createElement('style');
                    style.id = 'mobilolite-styles';
                    document.head.appendChild(style);
                }
               
                // Force update the styles
                style.textContent = generateCSS(colors);
                console.log('Styles updated with colors:', colors);
               
                // Force a repaint by temporarily modifying a style property
                if (this.container) {
                    const widget = this.container.querySelector('.mobilolite-widget');
                    if (widget) {
                        widget.style.display = 'none';
                        widget.offsetHeight; // Trigger reflow
                        widget.style.display = '';
                    }
                }
            };

            // If DOM is ready, update immediately, otherwise wait
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', updateStylesImmediate);
            } else {
                // Use setTimeout to ensure this runs after any pending DOM operations
                setTimeout(updateStylesImmediate, 0);
            }
        }

        // Method to force complete style refresh
        forceStyleRefresh(colors) {
            // Remove existing styles
            const oldStyle = document.getElementById('mobilolite-styles');
            if (oldStyle) {
                oldStyle.remove();
            }
           
            // Wait a tick, then re-inject
            setTimeout(() => {
                const newStyle = document.createElement('style');
                newStyle.id = 'mobilolite-styles';
                newStyle.textContent = generateCSS(colors);
                document.head.appendChild(newStyle);
               
                // Force DOM reflow
                document.body.offsetHeight;
               
                console.log('Forced style refresh completed');
            }, 10);
        }

        // Debug method to check theme application
        debugTheme() {
            console.log('=== THEME DEBUG INFO ===');
            console.log('Widget data:', this.widgetData);
            console.log('Theme colors from API:', this.widgetData?.theme);
           
            const styleEl = document.getElementById('mobilolite-styles');
            console.log('Style element exists:', !!styleEl);
           
            if (styleEl) {
                // Check if API colors are in the CSS
                const hasApiColors = this.widgetData?.theme &&
                    styleEl.textContent.includes(this.widgetData.theme['color-1']) &&
                    styleEl.textContent.includes(this.widgetData.theme['color-2']) &&
                    styleEl.textContent.includes(this.widgetData.theme['color-3']);
               
                console.log('✅ API colors applied in CSS:', hasApiColors);
               
                if (!hasApiColors) {
                    console.log('⚠️ Using default colors - API colors not found in CSS');
                }
               
                console.log('Current styles preview:', styleEl.textContent.substring(0, 300));
            }
           
            const widget = document.querySelector('.mobilolite-widget');
            if (widget) {
                const computedStyle = window.getComputedStyle(widget);
                console.log('Computed background color:', computedStyle.backgroundColor);
                console.log('Computed header background:', window.getComputedStyle(document.querySelector('.mobilolite-header')).backgroundColor);
            }
           
            // Show what colors should be used
            console.log('Expected colors:');
            if (this.widgetData?.theme) {
                console.log('From API:', this.widgetData.theme);
            } else {
                console.log('From defaults:', {
                    'color-1': '#ecf39e',
                    'color-2': '#90a955',
                    'color-3': '#4f772d',
                    'color-4': '#31572c',
                    'color-5': '#132a13'
                });
            }
            console.log('========================');
        }

        createElements() {
            // Create overlay for center positioning
            if (this.config.position === 'center') {
                this.overlay = document.createElement('div');
                this.overlay.className = 'mobilolite-overlay';
                document.body.appendChild(this.overlay);
            }

            // Create main container
            this.container = document.createElement('div');
           
            // Create FAB for minimized state
            if (this.config.minimizable && this.config.position !== 'fullscreen') {
                this.fab = document.createElement('div');
                this.fab.className = 'mobilolite-fab';
                this.fab.innerHTML = '💬';
                if (!this.isMinimized) this.fab.classList.add('hidden');
                document.body.appendChild(this.fab);
            }

            // Create teaser bubble
            if (this.config.teaserEnabled) {
                this.teaser = document.createElement('div');
                this.teaser.className = 'mobilolite-teaser';
                this.teaser.innerHTML = `
                    <div class="mobilolite-teaser-icon">🔔</div>
                    <div class="mobilolite-teaser-text">
                        <div>${this.config.teaserTextLine1}</div>
                        <div style="opacity:.9; font-size:12px; margin-top:2px;">${this.config.teaserTextLine2}</div>
                    </div>
                    <div class="mobilolite-teaser-close" title="Dismiss">✕</div>
                `;
                document.body.appendChild(this.teaser);
                setTimeout(() => {
                    if (this.teaser) this.teaser.classList.add('active');
                }, Math.max(0, Number(this.config.teaserDelayMs) || 2500));
            }

            // Append container to appropriate parent
            if (this.config.position === 'center') {
                this.overlay.appendChild(this.container);
            } else {
                document.body.appendChild(this.container);
            }
        }

        render() {
            console.log('render() called');
            let positionClass = '';
            if (this.config.position !== 'center') {
                positionClass = `position-${this.config.position}`;
            }

            const headerHTML = this.renderHeader();
            const chatAreaHTML = this.renderChatArea();
            const inputAreaHTML = this.renderInputArea();

            this.container.innerHTML = `
                <div class="mobilolite-widget ${positionClass} ${this.isMinimized ? 'minimized' : ''}">
                    ${headerHTML}
                    ${chatAreaHTML}
                    ${inputAreaHTML}
                </div>
            `;

            console.log('Widget HTML rendered:', this.container.innerHTML);

            if (this.config.position === 'center') {
                this.overlay.classList.toggle('active', !this.isMinimized);
            }

            // Keep key elements fixed
            try {
                const widget = this.container.querySelector('.mobilolite-widget');
                if (widget && !this.isExpanded && this.config.position !== 'center') {
                    widget.style.position = 'fixed';
                    widget.style.zIndex = '999999';
                    if (this.config.position === 'bottom-right') {
                        widget.style.bottom = '20px';
                        widget.style.right = '20px';
                        widget.style.left = '';
                        widget.style.top = '';
                    } else if (this.config.position === 'bottom-left') {
                        widget.style.bottom = '20px';
                        widget.style.left = '20px';
                        widget.style.right = '';
                        widget.style.top = '';
                    }
                }
                if (this.fab) {
                    this.fab.style.position = 'fixed';
                    this.fab.style.bottom = '20px';
                    this.fab.style.right = '20px';
                    this.fab.style.zIndex = '999997';
                }
                if (this.teaser) {
                    this.teaser.style.position = 'fixed';
                    this.teaser.style.bottom = '28px';
                    this.teaser.style.right = '90px';
                    this.teaser.style.zIndex = '999996';
                }
            } catch {}
        }

        renderHeader() {
            console.log('renderHeader called, minimizable:', this.config.minimizable);
           
            // Always render the cross button for now to debug
            const crossBtn = `<button class="mobilolite-cross-btn" data-action="cross-minimize" title="Minimize to Icon" style="display: flex !important; border-radius: 4px; padding: 0px; margin-left: 0px; color: ${this.widgetData && this.widgetData.theme && this.widgetData.theme['color-4'] ? this.widgetData.theme['color-4'] : '#31572c'}; font-weight: bold;">${ICONS.close}</button>`;
           
            const closeBtn = this.config.position === 'center' || this.config.position === 'fullscreen' ?
                `<button class="mobilolite-close-btn" data-action="close">${ICONS.close}</button>` : '';

            const headerHTML = `
                <div class="mobilolite-header">
                    <div class="mobilolite-user-info">
                        <div class="mobilolite-avatar">
                            ${
                                (this.config.forceLocalBrand && this.config.brandLogoPath)
                                  ? `<img src="${this.config.brandLogoPath}" alt="The Eco-Friendly Cake Café" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%; background: white;">`
                                  : (this.widgetData && this.widgetData.image_link)
                                      ? `<img src="${this.widgetData.image_link}" alt="Bot Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
                                      : (this.config.brandLogoPath
                                          ? `<img src="${this.config.brandLogoPath}" alt="The Eco-Friendly Cake Café" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%; background: white;">`
                                          : '🤖')
                            }
                        </div>
                        <div class="mobilolite-user-details">
                            <h3>${this.config.forceLocalBrand ? 'The Eco-Friendly Cake Café' : this.config.userName} <span class="mobilolite-badge">Cafe Support</span></h3>
                            <p>${this.config.userStatus}</p>
                        </div>
                    </div>
                    <div class="mobilolite-header-icons">
                                                 <div class="mobilolite-icon" onclick="window.mobiloliteInstance && window.mobiloliteInstance.showContactForm()" style="cursor: pointer;" title="Contact Form">${ICONS.chat}</div>
                         <div class="mobilolite-icon" onclick="window.mobiloliteInstance && window.mobiloliteInstance.showLoginForm()" style="cursor: pointer;" title="Login Form">${ICONS.user}</div>
                         <div class="mobilolite-icon" onclick="window.mobiloliteInstance && window.mobiloliteInstance.showJobApplicationForm()" style="cursor: pointer;" title="Job Application">${ICONS.briefcase}</div>
                         <div class="mobilolite-icon" onclick="window.mobiloliteInstance && window.mobiloliteInstance.showCustomerTicketForm()" style="cursor: pointer; display: ${this.userLoginType === 'customer' ? 'flex' : 'none'};" title="Customer Support">${ICONS.customer}</div>
                         <div class="mobilolite-icon" onclick="window.mobiloliteInstance && window.mobiloliteInstance.showEmployeeTicketForm()" style="cursor: pointer; display: ${this.userLoginType === 'employee' ? 'flex' : 'none'};" title="Employee Support">${ICONS.employee}</div>
                         <div class="mobilolite-icon" onclick="window.mobiloliteInstance && window.mobiloliteInstance.toggleExpand()" style="cursor: pointer;" title="Expand/Collapse" id="expand-btn">${ICONS.expand}</div>
                        ${crossBtn}
                        ${closeBtn}
                    </div>
                </div>
            `;
           
            console.log('Cross button HTML:', crossBtn);
            console.log('Full header HTML:', headerHTML);
           
            return headerHTML;
        }

        renderChatArea() {
            return `
                <div class="mobilolite-chat-area">
                    ${this.messages.map(msg => this.renderMessage(msg)).join('')}
                </div>
            `;
        }

        renderMessage(message) {
            const avatarContent = message.type === 'bot' ?
                ((this.config.forceLocalBrand && this.config.brandLogoPath)
                    ? `<img src="${this.config.brandLogoPath}" alt="The Eco-Friendly Cake Café" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%; background: white;">`
                    : (this.widgetData && this.widgetData.image_link)
                        ? `<img src="${this.widgetData.image_link}" alt="Bot Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
                        : (this.config.brandLogoPath
                            ? `<img src="${this.config.brandLogoPath}" alt="The Eco-Friendly Cake Café" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%; background: white;">`
                            : '🤖'))
                : '👤';
           
            // Handle form messages differently
            if (message.isForm) {
                return `
                    <div class="mobilolite-message ${message.type}">
                        <div class="mobilolite-message-avatar">${avatarContent}</div>
                        <div class="mobilolite-message-content" style="max-width: 100%;">
                            ${message.content}
                            <div class="mobilolite-message-time">${message.time}</div>
                        </div>
                    </div>
                `;
            }
           
            return `
                <div class="mobilolite-message ${message.type}">
                    <div class="mobilolite-message-avatar">${avatarContent}</div>
                    <div class="mobilolite-message-content">
                        <div class="mobilolite-message-bubble">
                            ${message.content}
                        </div>
                        <div class="mobilolite-message-time">${message.time}</div>
                    </div>
                </div>
            `;
        }

        renderInputArea() {
            return `
                <div class="mobilolite-input-area">
                    <input type="text" class="mobilolite-input" placeholder="Type your message...">
                    <button class="mobilolite-send-btn">Send</button>
                </div>
                <div class="mobilolite-powered-by">Powered By EchoFriendly cafe</div>
            `;
        }

        bindEvents() {
            // Header click to expand when minimized
            const header = this.container.querySelector('.mobilolite-header');
            header.addEventListener('click', (e) => {
                if (this.isMinimized && !e.target.closest('button')) {
                    this.toggleMinimize();
                }
            });

            // Action buttons
            const crossBtn = this.container.querySelector('[data-action="cross-minimize"]');
            const closeBtn = this.container.querySelector('[data-action="close"]');

            if (crossBtn) {
                crossBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                   
                    // Save current session first
                    try {
                        // Determine the domain to use for saving session
                        let domain = 'domain_3'; // Default domain
                        if (this.authToken && this.allowedDomains.length > 0) {
                            domain = this.allowedDomains[0]; // Use first allowed domain
                        }

                        // Save session before minimizing
                        const response = await fetch(`https://py-aiagent.mobiloitte.io/domain/${domain}/save-session`, {
                            method: 'POST',
                            headers: {
                                'accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                session_id: this.sessionId,
                                title: this.sessionId
                            })
                        });

                        if (response.ok) {
                            const saveData = await response.json();
                            console.log('Session saved successfully:', saveData);
                        } else {
                            console.warn('Failed to save session:', response.status);
                        }
                    } catch (error) {
                        console.error('Error saving session:', error);
                    }

                    // Generate new session ID for next session
                    this.sessionId = Date.now().toString();
                   
                    // Minimize to circular icon
                    this.toggleMinimize();
                });
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.close();
                });
            }

            // FAB click
            if (this.fab) {
                this.fab.addEventListener('click', () => {
                    this.toggleMinimize();
                });
            }

            // Teaser interactions
            if (this.teaser) {
                const closeEl = this.teaser.querySelector('.mobilolite-teaser-close');
                if (closeEl) closeEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.teaser.classList.remove('active');
                });
                this.teaser.addEventListener('click', () => {
                    this.teaser.classList.remove('active');
                    if (this.isMinimized) this.toggleMinimize();
                });
            }

            // Overlay click to close
            if (this.overlay) {
                this.overlay.addEventListener('click', (e) => {
                    if (e.target === this.overlay) {
                        this.close();
                    }
                });
            }

            // Message input
            const input = this.container.querySelector('.mobilolite-input');
            const sendBtn = this.container.querySelector('.mobilolite-send-btn');

            const sendMessage = () => {
                const message = input.value.trim();
                if (message) {
                    this.addMessage({
                        type: 'user',
                        content: message,
                        time: this.getCurrentTime()
                    });
                    input.value = '';
                   
                    // Trigger custom event
                    this.onUserMessage(message);
                }
            };

            sendBtn.addEventListener('click', sendMessage);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }

        toggleMinimize() {
            this.isMinimized = !this.isMinimized;
            const widget = this.container.querySelector('.mobilolite-widget');
            widget.classList.toggle('minimized', this.isMinimized);

            // Hide the FAB when widget is minimized (since widget becomes the circular icon)
            if (this.fab) {
                this.fab.classList.toggle('hidden', this.isMinimized);
            }

            if (this.overlay) {
                this.overlay.classList.toggle('active', !this.isMinimized);
            }

            // If minimizing (not expanding), clear messages for fresh session
            if (this.isMinimized) {
                // Keep only the welcome message
                this.messages = this.messages.filter(msg => msg.isWelcome);
                this.updateChatArea();
            }
        }

        toggleExpand() {
            const widget = this.container.querySelector('.mobilolite-widget');
            const expandBtn = this.container.querySelector('#expand-btn');
           
            this.isExpanded = !this.isExpanded;
           
            if (this.isExpanded) {
                // Expand to full screen
                widget.classList.add('expanded');
                expandBtn.innerHTML = ICONS.contract;
                expandBtn.title = 'Contract';
            } else {
                // Contract to original size
                widget.classList.remove('expanded');
                expandBtn.innerHTML = ICONS.expand;
                expandBtn.title = 'Expand';
            }
        }



        async close() {
            try {
                // Determine the domain to use for saving session
                let domain = 'domain_3'; // Default domain
                if (this.authToken && this.allowedDomains.length > 0) {
                    domain = this.allowedDomains[0]; // Use first allowed domain
                }

                // Save session before closing
                const response = await fetch(`https://py-aiagent.mobiloitte.io/domain/${domain}/save-session`, {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        session_id: this.sessionId,
                        title: this.sessionId
                    })
                });

                if (response.ok) {
                    const saveData = await response.json();
                    console.log('Session saved successfully:', saveData);
                } else {
                    console.warn('Failed to save session:', response.status);
                }
            } catch (error) {
                console.error('Error saving session:', error);
            }

            // Reset session ID when closing the widget
            this.sessionId = Date.now().toString();
           
            if (this.container) {
                this.container.remove();
            }
            if (this.overlay) {
                this.overlay.remove();
            }
            if (this.fab) {
                this.fab.remove();
            }
        }

        async onUserMessage(message) {
            const lowerMessage = message.toLowerCase();

            // If logged in, skip all form validations and only check for ticket form triggers
            if (this.userLoginType === 'employee') {
                if (this.containsEmployeeTicketKeywords(lowerMessage)) {
                    this.sendBotMessage("It looks like you need employee support. Please fill out the employee ticket form below.");
                    setTimeout(() => {
                        this.showEmployeeTicketForm();
                    }, 300);
                    return;
                }
            } else if (this.userLoginType === 'customer') {
                if (this.containsCustomerTicketKeywords(lowerMessage)) {
                    this.sendBotMessage("It looks like you need customer support. Please fill out the customer ticket form below.");
                    setTimeout(() => {
                        this.showCustomerTicketForm();
                    }, 300);
                    return;
                }
            } else {
                // Not logged in: all form validations as before
                // Check for business-related keywords that should trigger contact form
                if (this.containsBusinessKeywords(lowerMessage)) {
                    this.sendBotMessage("It seems like you're trying to reach out to us. Want to get in touch with our team? Please fill out this quick form below.");
                    this.showContactForm();
                    return;
                }

                // Check for job application keywords
                if (this.containsJobApplicationKeywords(lowerMessage)) {
                    this.sendBotMessage("It looks like you're interested in a job opportunity. Please fill out the job application form below.");
                    setTimeout(() => {
                        this.showJobApplicationForm();
                    }, 300);
                    return;
                }

                // Check for employee login keywords
                if (this.containsEmployeeLoginKeywords(lowerMessage)) {
                    this.sendBotMessage("It looks like you want to log in as an employee. Please use the form below.");
                    setTimeout(() => {
                        this.showLoginForm();
                        // Pre-select Employee toggle if possible
                        setTimeout(() => {
                            const employeeBtn = document.querySelectorAll('.mobilolite-toggle-btn')[1];
                            if (employeeBtn) employeeBtn.click();
                        }, 100);
                    }, 300);
                    return;
                }

                // Check for customer login keywords
                if (this.containsCustomerLoginKeywords(lowerMessage)) {
                    this.sendBotMessage("It looks like you want to log in as a customer. Please use the form below.");
                    setTimeout(() => {
                        this.showLoginForm();
                        // Pre-select Customer toggle if possible
                        setTimeout(() => {
                            const customerBtn = document.querySelectorAll('.mobilolite-toggle-btn')[0];
                            if (customerBtn) customerBtn.click();
                        }, 100);
                    }, 300);
                    return;
                }

                if (lowerMessage.includes('login') || lowerMessage.includes('sign in')) {
                    this.showLoginForm();
                    return;
                }

                if (lowerMessage.includes('job') || lowerMessage.includes('apply') || lowerMessage.includes('application')) {
                    this.showJobApplicationForm();
                    return;
                }

                if (lowerMessage.includes('ticket') || lowerMessage.includes('support')) {
                    if (!this.userLoginType) {
                        this.sendBotMessage("Please login first to access support tickets. You can use the login button above.");
                        return;
                    }
                    if (this.userLoginType === 'employee') {
                        this.showEmployeeTicketForm();
                    } else {
                        this.showCustomerTicketForm();
                    }
                    return;
                }

                // Check for greeting messages and provide immediate response
                if (this.isGreetingMessage(lowerMessage)) {
                    const greetingResponse = this.getRandomGreetingResponse();
                    this.sendBotMessage(greetingResponse);
                    return;
                }

                // Check for inappropriate language and provide appropriate response
                if (this.containsInappropriateLanguage(lowerMessage)) {
                    const inappropriateResponse = this.getInappropriateLanguageResponse();
                    this.sendBotMessage(inappropriateResponse);
                    return;
                }
            }

            // Show typing indicator
            this.sendBotMessage("...");

            try {
                // Determine the domain to use
                let domain = 'domain_3'; // Default domain
                if (this.authToken && this.allowedDomains.length > 0) {
                    domain = this.allowedDomains[0]; // Use first allowed domain
                }

                // Prepare headers
                const headers = {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                };

                // Add authorization header if user is logged in
                if (this.authToken) {
                    headers['Authorization'] = `Bearer ${this.authToken}`;
                }

                // Prepare request body
                const requestBody = {
                    query: message,
                    num_results: 20,
                    similarity_threshold: 0.5,
                    session_id: this.sessionId, // Use persistent session ID
                    use_session_history: false,
                    session_history_title: "string"
                };

                // Add user_type if user is logged in
                if (this.userLoginType) {
                    requestBody.user_type = this.userLoginType;
                }

                // Make API call to the endpoint
                const response = await fetch(`https://py-aiagent.mobiloitte.io/query/${domain}`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
               
                // Remove the typing indicator
                this.messages = this.messages.filter(msg => msg.content !== "...");
               
                // Send the answer from the API response
                if (data.answer) {
                    this.sendBotMessage(data.answer);
                } else {
                    this.sendBotMessage("I'm sorry, I couldn't find a relevant answer for your query.");
                }

            } catch (error) {
                console.error('Error calling API:', error);
               
                // Remove the typing indicator
                this.messages = this.messages.filter(msg => msg.content !== "...");
               
                // Send error message
                this.sendBotMessage("I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.");
            }

            // Dispatch custom event for external handling
            window.dispatchEvent(new CustomEvent('mobiloliteMessage', {
                detail: { message, widget: this }
            }));
        }

        // Improved method to check if message is a greeting (strict match)
        isGreetingMessage(message) {
            // Lowercase and trim message for matching
            const msg = message.trim().toLowerCase();
            // List of greeting phrases (multi-word)
            const greetingPhrases = [
                'good morning', 'good afternoon', 'good evening', 'good night', 'good day',
                'goodmorning', 'goodafternoon', 'goodevening', 'goodnight',
                'what\'s up', 'howdy', 'greetings', 'hello there', 'hi there', 'hey there'
            ];
            // List of greeting words (single word)
            const greetingWords = [
                'hello', 'hi', 'hii', 'hey', 'yo', 'gm', 'gn', 'sup'
            ];
            // Check for exact phrase match
            for (const phrase of greetingPhrases) {
                if (msg === phrase) return true;
            }
            // Check for single word greetings using word boundaries
            for (const word of greetingWords) {
                const regex = new RegExp(`\\b${word}\\b`, 'i');
                if (regex.test(msg)) return true;
            }
            return false;
        }

        // Method to get random greeting response
        getRandomGreetingResponse() {
            const greetingResponses = [
                "Welcome to The Eco-Friendly Cake Café! Would you like to see our menu or today’s specials?",
                "Hi! Looking for coffee, cakes, or pastries? I can help with orders and reservations.",
                "Hello! I can share opening hours, location, or take your order.",
                "Hey there! Want to reserve a table or ask about custom cakes?",
                "Hi! We have vegan and gluten-free options. What are you in the mood for?",
                "Good day! Need catering details or a birthday cake quote?",
                "Welcome! I can help with delivery, pickup, or nutritional info.",
                "Hello! Ask me about prices, ingredients, or allergens.",
                "Hi there! Would you like to place an order or see bestsellers?",
                "Hey! I can assist with menu, hours, reservations, or order status."
            ];
           
            const randomIndex = Math.floor(Math.random() * greetingResponses.length);
            return greetingResponses[randomIndex];
        }

        // Method to check if message contains inappropriate language
        containsInappropriateLanguage(message) {
            const inappropriateWords = [
                'fuck', 'fucking', 'fucker', 'fuckin', 'fck', 'fk',
                'bitch', 'bitchy', 'bitches', 'b!tch', 'b!tches',
                'shit', 'sh!t', 'sh*t', 'sh1t', 'sh!tty',
                'ass', 'asshole', 'a$$', 'a$$hole', 'a**hole',
                'damn', 'damnit', 'dammit', 'd@mn', 'd@mnit',
                'hell', 'h3ll', 'h3llish',
                'piss', 'p!ss', 'p!ssed', 'p!ssing',
                'dick', 'd!ck', 'd!ckhead', 'd!ckface',
                'cock', 'c0ck', 'c0ckhead',
                'pussy', 'p*ssy', 'p*ss', 'p*ssycat',
                'whore', 'wh0re', 'wh0r3', 'slut', 'sl*t',
                'bastard', 'b@stard', 'b@st@rd',
                'motherfucker', 'motherf*cker', 'motherf*cking',
                'sonofabitch', 'sonofab!tch', 'sonofab*tch',
                'goddamn', 'godd@mn', 'g0dd@mn',
                'bullshit', 'bullsh!t', 'bullsh*t', 'b*llsh*t',
                'dumbass', 'dumb@ss', 'dumb@$$',
                'jackass', 'jack@ss', 'j@ck@ss',
                'dumbfuck', 'dumbf*ck', 'dumbf*cker',
                'shithead', 'sh!thead', 'sh*thead',
                'fuckface', 'f*ckface', 'f*ckf@ce',
                'dickhead', 'd!ckhead', 'd!ckh3ad',
                'cockface', 'c0ckface', 'c0ckf@ce',
                'pissface', 'p!ssface', 'p!ssf@ce',
                'assface', 'a$$face', 'a$$f@ce',
                'fuckwit', 'f*ckwit', 'f*ckw!t',
                'dumbfuck', 'dumbf*ck', 'dumbf*cker',
                'shitfuck', 'sh!tf*ck', 'sh*tf*ck',
                'fuckshit', 'f*cksh!t', 'f*cksh*t',
                'bitchass', 'b!tcha$$', 'b!tcha$$',
                'assbitch', 'a$$b!tch', 'a$$b!tch',
                'fuckass', 'f*cka$$', 'f*cka$$',
                'dickass', 'd!cka$$', 'd!cka$$',
                'cockass', 'c0cka$$', 'c0cka$$',
                'pissass', 'p!ssa$$', 'p!ssa$$',
                'shitass', 'sh!ta$$', 'sh*ta$$',
                'fuckhead', 'f*ckhead', 'f*ckh3ad',
                'dickhead', 'd!ckhead', 'd!ckh3ad',
                'cockhead', 'c0ckhead', 'c0ckh3ad',
                'pisshead', 'p!sshead', 'p!ssh3ad',
                'asshead', 'a$$head', 'a$$h3ad',
                'shithead', 'sh!thead', 'sh*th3ad'
            ];
           
            return inappropriateWords.some(word => message.includes(word));
        }

        // Method to get inappropriate language response
        getInappropriateLanguageResponse() {
            const inappropriateResponses = [
                "I understand you may be frustrated, but I'd appreciate if we could keep our conversation professional and respectful. How can I help you with your actual needs?",
                "I'm here to help you professionally. Let's focus on how I can assist you with your questions or concerns.",
                "I'd be happy to help you, but I'd appreciate if we could maintain a respectful conversation. What can I assist you with?",
                "Let's keep our interaction professional and constructive. How may I help you today?",
                "I'm designed to provide helpful assistance. Let's focus on how I can support you with your needs.",
                "I understand you may have concerns, but I'd appreciate professional communication. How can I assist you?",
                "Let's maintain a respectful dialogue. What would you like to know or discuss?",
                "I'm here to help you professionally. What specific assistance do you need?",
                "I'd appreciate if we could keep our conversation constructive. How can I be of service to you?",
                "Let's focus on how I can help you with your questions or concerns in a professional manner.",
                "I'm designed to provide helpful support. Let's discuss how I can assist you with your needs.",
                "I'd be happy to help you professionally. What would you like to know or discuss?",
                "Let's maintain a respectful conversation. How may I assist you today?",
                "I'm here to provide helpful assistance. What can I help you with?",
                "Let's keep our interaction professional and constructive. What do you need assistance with?"
            ];
           
            const randomIndex = Math.floor(Math.random() * inappropriateResponses.length);
            return inappropriateResponses[randomIndex];
        }

                 // Form handling methods
         showContactForm() {
             console.log('showContactForm called');
             // If contact form is already open, close it
             if (this.activeForm === 'contact') {
                 this.closeForm();
                 return;
             }
           
            // Close any other open form first
            if (this.activeForm) {
                this.closeForm();
            }
           
            const formMessage = {
                type: 'bot',
                content: this.renderContactForm(),
                time: this.getCurrentTime(),
                isForm: true,
                formType: 'contact'
            };
            this.addMessage(formMessage);
            this.activeForm = 'contact';
            this.updateIconStates();
            console.log('Contact form opened');
        }

        showLoginForm() {
            // If login form is already open, close it
            if (this.activeForm === 'login') {
                this.closeForm();
                return;
            }
           
            // Close any other open form first
            if (this.activeForm) {
                this.closeForm();
            }
           
            const formMessage = {
                type: 'bot',
                content: this.renderLoginForm(),
                time: this.getCurrentTime(),
                isForm: true,
                formType: 'login'
            };
            this.addMessage(formMessage);
            this.activeForm = 'login';
            this.updateIconStates();
            console.log('Login form opened');
        }

        showJobApplicationForm() {
            // If job form is already open, close it
            if (this.activeForm === 'jobApplication') {
                this.closeForm();
                return;
            }
           
            // Close any other open form first
            if (this.activeForm) {
                this.closeForm();
            }
           
            const formMessage = {
                type: 'bot',
                content: this.renderJobApplicationForm(),
                time: this.getCurrentTime(),
                isForm: true,
                formType: 'jobApplication'
            };
            this.addMessage(formMessage);
            this.activeForm = 'jobApplication';
            this.updateIconStates();
            console.log('Job application form opened');
        }

        showCustomerTicketForm() {
            // If customer ticket form is already open, close it
            if (this.activeForm === 'customerTicket') {
                this.closeForm();
                return;
            }
           
            // Close any other open form first
            if (this.activeForm) {
                this.closeForm();
            }
           
            const formMessage = {
                type: 'bot',
                content: this.renderCustomerTicketForm(),
                time: this.getCurrentTime(),
                isForm: true,
                formType: 'customerTicket'
            };
            this.addMessage(formMessage);
            this.activeForm = 'customerTicket';
            this.updateIconStates();
            console.log('Customer ticket form opened');
        }

        showEmployeeTicketForm() {
            // If employee ticket form is already open, close it
            if (this.activeForm === 'employeeTicket') {
                this.closeForm();
                return;
            }
           
            // Close any other open form first
            if (this.activeForm) {
                this.closeForm();
            }
           
            const formMessage = {
                type: 'bot',
                content: this.renderEmployeeTicketForm(),
                time: this.getCurrentTime(),
                isForm: true,
                formType: 'employeeTicket'
            };
            this.addMessage(formMessage);
            this.activeForm = 'employeeTicket';
            this.updateIconStates();
            console.log('Employee ticket form opened');
        }

        renderContactForm() {
            // Filter options based on optionid
            const interestOptions = this.leadsOptions.filter(option => option.optionid === 1);
            const sourceOptions = this.leadsOptions.filter(option => option.optionid === 2);

            return `
                <div class="mobilolite-form-container">
                    <div class="mobilolite-form-header">
                        <h3>Contact Us</h3>
                        <button class="mobilolite-form-close" onclick="window.mobiloliteInstance && window.mobiloliteInstance.closeForm()">×</button>
                    </div>
                    <form class="mobilolite-form" onsubmit="window.mobiloliteInstance && window.mobiloliteInstance.handleContactFormSubmit(event)">
                        <div class="mobilolite-form-field">
                            <label>Name *</label>
                            <input type="text" name="name" placeholder="Your name" required>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Email *</label>
                            <input type="email" name="email" placeholder="your.email@example.com" required>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Source</label>
                            <select name="dropdown1" required>
                                <option value="">Select an option</option>
                                ${sourceOptions.map(option => `<option value="${option.list_label}">${option.list_label}</option>`).join('')}
                            </select>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Interest</label>
                            <select name="dropdown2">
                                <option value="">Select an option</option>
                                ${interestOptions.map(option => `<option value="${option.list_label}">${option.list_label}</option>`).join('')}
                            </select>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Message *</label>
                            <textarea name="message" placeholder="Your message..." rows="3" required></textarea>
                        </div>
                        <div class="mobilolite-form-buttons">
                            <button type="button" onclick="window.mobiloliteInstance && window.mobiloliteInstance.closeForm()">Cancel</button>
                            <button type="submit">Send Message</button>
                        </div>
                    </form>
                </div>
            `;
        }

        renderLoginForm() {
            return `
                <div class="mobilolite-form-container">
                                         <div class="mobilolite-form-header">
                         <h3>Login</h3>
                         <button class="mobilolite-form-close" onclick="window.mobiloliteInstance && window.mobiloliteInstance.closeForm()">×</button>
                     </div>
                                         <form class="mobilolite-form" onsubmit="window.mobiloliteInstance && window.mobiloliteInstance.handleLoginFormSubmit(event)">
                        <div class="mobilolite-form-toggle">
                                                         <button type="button" class="mobilolite-toggle-btn active" onclick="window.mobiloliteInstance && window.mobiloliteInstance.setLoginType('Customer')">Customer</button>
                             <button type="button" class="mobilolite-toggle-btn" onclick="window.mobiloliteInstance && window.mobiloliteInstance.setLoginType('Employee')">Employee</button>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Email *</label>
                            <input type="email" name="email" placeholder="Enter your email" required>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Password *</label>
                            <div class="mobilolite-password-field">
                                <input type="password" name="password" placeholder="Enter your password" required>
                                                                 <button type="button" class="mobilolite-password-toggle" onclick="window.mobiloliteInstance && window.mobiloliteInstance.togglePassword(this)">👁</button>
                            </div>
                        </div>
                        <button type="submit" class="mobilolite-form-submit">Login</button>
                    </form>
                </div>
            `;
        }

        renderJobApplicationForm() {
            return `
                <div class="mobilolite-form-container">
                    <div class="mobilolite-form-header">
                        <h3>Job Application</h3>
                        <button class="mobilolite-form-close" onclick="window.mobiloliteInstance && window.mobiloliteInstance.closeForm()">×</button>
                    </div>
                    <form class="mobilolite-form" onsubmit="window.mobiloliteInstance && window.mobiloliteInstance.handleJobApplicationFormSubmit(event)">
                        <div class="mobilolite-form-field">
                            <label>Full Name *</label>
                            <input type="text" name="name" placeholder="Enter your full name" required>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Email Address *</label>
                            <input type="email" name="email" placeholder="your.email@example.com" required>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Phone Number *</label>
                            <input type="tel" name="mobile" placeholder="+1 (555) 123-4567" required>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Job Category *</label>
                            <select name="job_category" required>
                                <option value="">Select a category</option>
                                ${this.jobCategories.map(category => `<option value="${category.name}">${category.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Experience Level *</label>
                            <select name="experience" required>
                                <option value="">Select experience level</option>
                                ${this.jobExperiences.map(exp => `<option value="${exp.name}">${exp.name} years</option>`).join('')}
                            </select>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Resume/CV *</label>
                            <div class="mobilolite-file-upload">
                                <input type="file" name="file" accept=".pdf" required>
                                <div class="mobilolite-file-placeholder">
                                    <span>📄</span>
                                    <p>Click to upload PDF resume</p>
                                    <small>Max size: 5MB</small>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="mobilolite-form-submit">Submit Application</button>
                    </form>
                </div>
            `;
        }

        renderCustomerTicketForm() {
            return `
                <div class="mobilolite-form-container">
                                         <div class="mobilolite-form-header">
                         <h3>Customer Support Ticket</h3>
                         <button class="mobilolite-form-close" onclick="window.mobiloliteInstance && window.mobiloliteInstance.closeForm()">×</button>
                     </div>
                                         <form class="mobilolite-form" onsubmit="window.mobiloliteInstance && window.mobiloliteInstance.handleCustomerTicketFormSubmit(event)">
                        <div class="mobilolite-form-field">
                            <label>Email Address *</label>
                            <input type="email" name="email" placeholder="your.email@example.com" required>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Issue Type *</label>
                            <select name="issueType" required>
                                <option value="">Select an issue type</option>
                                <option value="Technical">Technical</option>
                                <option value="Billing">Billing</option>
                                <option value="Account">Account</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Issue *</label>
                            <select name="issue" required>
                                <option value="">Select an issue</option>
                                <option value="Login Problem">Login Problem</option>
                                <option value="Payment Issue">Payment Issue</option>
                                <option value="Feature Request">Feature Request</option>
                                <option value="Bug Report">Bug Report</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Description *</label>
                            <textarea name="message" placeholder="Please describe your issue in detail..." rows="3" required></textarea>
                        </div>
                        <button type="submit" class="mobilolite-form-submit">Submit Ticket</button>
                    </form>
                </div>
            `;
        }

        renderEmployeeTicketForm() {
            return `
                <div class="mobilolite-form-container">
                                         <div class="mobilolite-form-header">
                         <h3>Employee Support Ticket</h3>
                         <button class="mobilolite-form-close" onclick="window.mobiloliteInstance && window.mobiloliteInstance.closeForm()">×</button>
                     </div>
                                         <form class="mobilolite-form" onsubmit="window.mobiloliteInstance && window.mobiloliteInstance.handleEmployeeTicketFormSubmit(event)">
                        <div class="mobilolite-form-field">
                            <label>Employee ID *</label>
                            <input type="text" name="id" placeholder="Enter your employee ID" required>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Issue Type *</label>
                            <select name="issueType" required>
                                <option value="">Select an issue type</option>
                                <option value="IT Support">IT Support</option>
                                <option value="HR">HR</option>
                                <option value="Facilities">Facilities</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Issue *</label>
                            <select name="issue" required>
                                <option value="">Select an issue</option>
                                <option value="Computer Problem">Computer Problem</option>
                                <option value="Access Request">Access Request</option>
                                <option value="Equipment Issue">Equipment Issue</option>
                                <option value="Policy Question">Policy Question</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="mobilolite-form-field">
                            <label>Description *</label>
                            <textarea name="message" placeholder="Please describe your issue in detail..." rows="3" required></textarea>
                        </div>
                        <button type="submit" class="mobilolite-form-submit">Submit Ticket</button>
                    </form>
                </div>
            `;
        }

        // Form event handlers
        closeForm() {
            // Remove the last form message
            this.messages = this.messages.filter(msg => !msg.isForm);
            this.activeForm = null; // Reset active form state
            this.updateChatArea();
            this.updateIconStates();
            console.log('Form closed');
        }

        updateIconStates() {
            // Remove active class from all icons
            const icons = document.querySelectorAll('.mobilolite-icon');
            icons.forEach(icon => icon.classList.remove('active'));
           
            // Add active class to the current form's icon
            if (this.activeForm) {
                const iconMap = {
                    'contact': 0, // First icon (chat)
                    'login': 1,   // Second icon (user)
                    'jobApplication': 2, // Third icon (briefcase)
                    'customerTicket': 3, // Fourth icon (settings)
                    'employeeTicket': 4  // Fifth icon (refresh)
                };
               
                const iconIndex = iconMap[this.activeForm];
                if (iconIndex !== undefined && icons[iconIndex]) {
                    icons[iconIndex].classList.add('active');
                }
            }
        }

        setLoginType(type) {
            const buttons = document.querySelectorAll('.mobilolite-toggle-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            if (event && event.target) {
                event.target.classList.add('active');
            }
            console.log('Login type set to:', type);
        }

        togglePassword(button) {
            const input = button.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                button.textContent = '🙈';
            } else {
                input.type = 'password';
                button.textContent = '👁';
            }
        }

        async handleContactFormSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            // Validation
            let errors = [];
            if (!data.name || data.name.trim().length < 2) {
                errors.push('Please enter a valid name (at least 2 characters).');
            } else if (data.name.trim().split(/\s+/).length > 50) {
                errors.push('Name cannot exceed 50 words.');
            } else if (data.name.trim().length > 50) {
                errors.push('Name cannot exceed 50 characters.');
            }
            if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
                errors.push('Please enter a valid email address.');
            }
            if (!data.dropdown1) {
                errors.push('Please select a source.');
            }
            if (!data.message || data.message.trim().length < 5) {
                errors.push('Please enter a message (at least 5 characters).');
            }
            if (errors.length > 0) {
                this.sendBotMessage(errors.join(' '));
                return;
            }
           
            // Show loading message
            this.sendBotMessage("Sending your message...");
           
            try {
                // Make API call to submit contact form
                const response = await fetch('https://py-aiagent.mobiloitte.io/api/v1/leads/', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        phone: "string", // Default value as per existing data
                        source: data.dropdown1,
                        interest: data.dropdown2,
                        message: data.message,
                        lead_metadata: {
                            interest: data.dropdown2,
                            additional_info: data.message
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const submitData = await response.json();
               
                // Remove loading message
                this.messages = this.messages.filter(msg => msg.content !== "Sending your message...");
               
                // Send success message
                this.sendBotMessage("Thank you for your message! We'll get back to you soon.");
                this.closeForm();
               
                console.log('Contact form submitted successfully:', submitData);

            } catch (error) {
                console.error('Contact form submission error:', error);
               
                // Remove loading message
                this.messages = this.messages.filter(msg => msg.content !== "Sending your message...");
               
                // Send error message
                this.sendBotMessage("Sorry, there was an error sending your message. Please try again later.");
            }
        }

        async handleLoginFormSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            // Validation
            let errors = [];
            if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
                errors.push('Please enter a valid email address.');
            }
            if (!data.password || data.password.length < 6) {
                errors.push('Password must be at least 6 characters.');
            }
            if (errors.length > 0) {
                this.sendBotMessage(errors.join(' '));
                return;
            }
           
            // Determine login type based on active toggle button
            const activeToggleBtn = document.querySelector('.mobilolite-toggle-btn.active');
            if (activeToggleBtn) {
                this.userLoginType = activeToggleBtn.textContent.toLowerCase();
            } else {
                this.userLoginType = 'customer'; // Default to customer
            }
           
            // Show loading message
            this.sendBotMessage("Logging you in...");
           
            try {
                // Make API call to login endpoint
                const response = await fetch('https://py-aiagent.mobiloitte.io/login', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                        user_type: this.userLoginType
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const loginData = await response.json();
               
                // Store authentication data
                this.authToken = loginData.token;
                this.allowedDomains = loginData.allowed_domains || [];
               
                // Remove loading message
                this.messages = this.messages.filter(msg => msg.content !== "Logging you in...");
               
                // Send success message
            this.sendBotMessage(`Login successful! Welcome ${this.userLoginType}!`);
            this.closeForm();
           
            // Refresh the header to show the appropriate support icon
            this.refreshHeader();
           
                console.log('Login successful:', loginData);
                console.log('Auth token:', this.authToken);
                console.log('Allowed domains:', this.allowedDomains);

            } catch (error) {
                console.error('Login error:', error);
               
                // Remove loading message
                this.messages = this.messages.filter(msg => msg.content !== "Logging you in...");
               
                // Send error message
                this.sendBotMessage("Login failed. Please check your credentials and try again.");
            }
        }

        async handleJobApplicationFormSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            // Validation
            let errors = [];
            if (!formData.get('name') || formData.get('name').trim().length < 2) {
                errors.push('Please enter your full name (at least 2 characters).');
            } else if (formData.get('name').trim().split(/\s+/).length > 50) {
                errors.push('Name cannot exceed 50 words.');
            }
            if (!formData.get('email') || !/^\S+@\S+\.\S+$/.test(formData.get('email'))) {
                errors.push('Please enter a valid email address.');
            }
            if (!formData.get('mobile') || !/^\+?[0-9\-\s]{7,20}$/.test(formData.get('mobile'))) {
                errors.push('Please enter a valid phone number.');
            }
            if (!formData.get('job_category')) {
                errors.push('Please select a job category.');
            }
            if (!formData.get('experience')) {
                errors.push('Please select your experience level.');
            }
            const file = formData.get('file');
            if (!file || !file.name || !/\.pdf$/i.test(file.name)) {
                errors.push('Please upload your resume in PDF format.');
            } else if (file.size > 5 * 1024 * 1024) {
                errors.push('Resume file size must be less than 5MB.');
            }
            if (errors.length > 0) {
                this.sendBotMessage(errors.join(' '));
                return;
            }
           
            // Show loading message
            this.sendBotMessage("Submitting your application...");
           
            try {
                // Make API call to submit job application
                const response = await fetch('https://py-aiagent.mobiloitte.io/api/v1/jobs/upload', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json'
                    },
                    body: formData // Send as multipart/form-data
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const submitData = await response.json();
               
                // Remove loading message
                this.messages = this.messages.filter(msg => msg.content !== "Submitting your application...");
               
                // Send success message
                this.sendBotMessage("Thank you for your application! We'll review it and get back to you soon.");
                this.closeForm();
               
                console.log('Job application submitted successfully:', submitData);

            } catch (error) {
                console.error('Job application submission error:', error);
               
                // Remove loading message
                this.messages = this.messages.filter(msg => msg.content !== "Submitting your application...");
               
                // Send error message
                this.sendBotMessage("Sorry, there was an error submitting your application. Please try again later.");
            }
        }

        handleCustomerTicketFormSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            // Validation
            let errors = [];
            if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
                errors.push('Please enter a valid email address.');
            }
            if (!data.issueType) {
                errors.push('Please select an issue type.');
            }
            if (!data.issue) {
                errors.push('Please select an issue.');
            }
            if (!data.message || data.message.trim().length < 5) {
                errors.push('Please describe your issue (at least 5 characters).');
            }
            if (errors.length > 0) {
                this.sendBotMessage(errors.join(' '));
                return;
            }
           
            this.sendBotMessage("Your ticket has been submitted! We'll get back to you within 24 hours.");
            this.closeForm();
            console.log('Customer ticket form submitted:', data);
        }

        handleEmployeeTicketFormSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            // Validation
            let errors = [];
            if (!data.id || data.id.trim().length < 2) {
                errors.push('Please enter a valid employee ID.');
            }
            if (!data.issueType) {
                errors.push('Please select an issue type.');
            }
            if (!data.issue) {
                errors.push('Please select an issue.');
            }
            if (!data.message || data.message.trim().length < 5) {
                errors.push('Please describe your issue (at least 5 characters).');
            }
            if (errors.length > 0) {
                this.sendBotMessage(errors.join(' '));
                return;
            }
           
            this.sendBotMessage("Your ticket has been submitted! IT support will contact you soon.");
            this.closeForm();
            console.log('Employee ticket form submitted:', data);
        }

        // Public API methods
        addMessage(message) {
            this.messages.push(message);
            this.updateChatArea();
            this.scrollToBottom();
        }

        sendBotMessage(content) {
            this.addMessage({
                type: 'bot',
                content: content,
                time: this.getCurrentTime()
            });
        }

        updateChatArea() {
            const chatArea = this.container.querySelector('.mobilolite-chat-area');
            if (chatArea) {
                chatArea.innerHTML = this.messages.map(msg => this.renderMessage(msg)).join('');
            }
        }

        refreshHeader() {
            // Find the customer and employee support icons
            const customerIcon = this.container.querySelector('.mobilolite-icon[onclick*="showCustomerTicketForm"]');
            const employeeIcon = this.container.querySelector('.mobilolite-icon[onclick*="showEmployeeTicketForm"]');
           
            if (customerIcon) {
                customerIcon.style.display = this.userLoginType === 'customer' ? 'flex' : 'none';
            }
           
            if (employeeIcon) {
                employeeIcon.style.display = this.userLoginType === 'employee' ? 'flex' : 'none';
            }
        }

        logout() {
            this.userLoginType = null;
            this.authToken = null;
            this.allowedDomains = [];
            this.refreshHeader();
            this.sendBotMessage("You have been logged out successfully.");
        }

        scrollToBottom() {
            const chatArea = this.container.querySelector('.mobilolite-chat-area');
            if (chatArea) {
                chatArea.scrollTop = chatArea.scrollHeight;
            }
        }

        getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }

        clearMessages() {
            this.messages = [];
            this.updateChatArea();
        }

        setMessages(messages) {
            this.messages = messages;
            this.updateChatArea();
            this.scrollToBottom();
        }

        open() {
            if (this.isMinimized) {
                this.toggleMinimize();
            }
        }

        minimize() {
            if (!this.isMinimized) {
                this.toggleMinimize();
            }
        }

        // API methods
        async updateWidget(data) {
            try {
                const response = await fetch(`${this.config.apiEndpoints.baseUrl}${this.config.apiEndpoints.updateWidget}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('Failed to update widget:', error);
                throw error;
            }
        }

        async getThemeColors() {
            try {
                const response = await fetch(`${this.config.apiEndpoints.baseUrl}${this.config.apiEndpoints.themeColors}`);
                return await response.json();
            } catch (error) {
                console.error('Failed to get theme colors:', error);
                throw error;
            }
        }

        // Public method to update theme colors
        updateTheme(colors) {
            if (colors && typeof colors === 'object') {
                console.log('Updating theme colors:', colors);
                this.updateStyles(colors);
               
                // Debug the theme application
                setTimeout(() => {
                    this.debugTheme();
                }, 100);
            } else {
                console.warn('Invalid colors provided to updateTheme:', colors);
            }
        }

        // Public method to refresh widget data and colors
        async refreshWidget() {
            await this.loadWidgetData();
            this.render();
        }

        // Public method to force refresh styles
        forceRefreshStyles() {
            if (this.widgetData && this.widgetData.theme) {
                console.log('Force refreshing styles...');
                this.forceStyleRefresh(this.widgetData.theme);
            } else {
                console.warn('No theme data available for force refresh');
            }
        }

        // Public method to debug current theme state
        debugCurrentTheme() {
            this.debugTheme();
        }

        // Simple test method
        testMethod() {
            console.log('Test method works!');
            return 'Test method is working';
        }

        // Method to check if message contains business-related keywords
        containsBusinessKeywords(message) {
            // Cafe-focused intents that should open the contact form (reservations, custom cakes, catering, etc.)
            const cafeKeywords = [
                'reservation', 'reserve a table', 'book a table', 'book table', 'table booking',
                'opening hours', 'hours', 'timings', 'location', 'address', 'directions',
                'menu', 'menu card', 'bestsellers', 'today’s specials', 'specials', 'deal', 'deals',
                'price', 'pricing', 'cost', 'quote', 'estimate',
                'custom cake', 'birthday cake', 'anniversary cake', 'wedding cake', 'photo cake', 'fondant',
                'catering', 'bulk order', 'corporate order',
                'delivery', 'pickup', 'takeout', 'take away', 'home delivery',
                'ingredients', 'allergens', 'nutritional', 'nutrition', 'calories',
                'vegan', 'gluten-free', 'sugar-free',
                'contact', 'contact form', 'get in touch', 'enquire', 'enquiry', 'request information'
            ];
            return cafeKeywords.some(keyword => message.includes(keyword));
        }

        // Method to check if message contains employee login keywords
        containsEmployeeLoginKeywords(message) {
            const employeeKeywords = [
                'employee login', 'employee sign in', 'staff login', 'staff sign in', 'employee portal',
                'employee access', 'employee account', 'employee credentials', 'work login', 'work sign in',
                'employee dashboard', 'employee area', 'employee authentication', 'employee profile',
                'employee signin', 'employee log in', 'employee sign-in', 'staff portal', 'staff access',
                'work portal', 'work access', 'work account', 'work credentials', 'work dashboard',
                'work area', 'work authentication', 'work profile', 'hr'
            ];
            return employeeKeywords.some(keyword => message.includes(keyword));
        }

        // Method to check if message contains customer login keywords
        containsCustomerLoginKeywords(message) {
            const customerKeywords = [
                'customer login', 'customer sign in', 'client login', 'client sign in', 'customer portal',
                'customer access', 'customer account', 'customer credentials', 'user login', 'user sign in',
                'customer dashboard', 'customer area', 'customer authentication', 'customer profile',
                'customer signin', 'customer log in', 'customer sign-in', 'client portal', 'client access',
                'user portal', 'user access', 'user account', 'user credentials', 'user dashboard',
                'user area', 'user authentication', 'user profile', 'order status', 'order tracking',
                 'order history', 'order details', 'order invoice', 'order receipt', 'order confirmation'
            ];
            return customerKeywords.some(keyword => message.includes(keyword));
        }

        // Method to check if message contains job application keywords
        containsJobApplicationKeywords(message) {
            const jobKeywords = [
                'job application', 'apply for job', 'apply job', 'job apply', 'submit resume', 'submit cv',
                'career', 'careers', 'vacancy', 'vacancies', 'open position', 'open positions', 'job opening',
                'job openings', 'work with you', 'join your team', 'join team', 'hiring', 'recruitment',
                'recruit', 'employment', 'job opportunity', 'job opportunities', 'job posting', 'job post',
                'job listing', 'job listings', 'job board', 'job portal', 'upload resume', 'upload cv',
                'send resume', 'send cv', 'apply now', 'apply here', 'apply online', 'career opportunity',
                'career opportunities', 'internship', 'intern', 'full time job', 'part time job', 'job seeker',
                'jobseeker', 'work opportunity', 'work opportunities', 'work opening', 'work openings',
                'work posting', 'work post', 'work listing', 'work listings', 'work board', 'work portal',
                'submit application', 'submit job application', 'job form', 'employment form', 'job enquiry',
                'job inquiry', 'job interest', 'job intent', 'job intent form', 'job apply form', 'job candidate',
                'candidate application', 'candidate form', 'candidate apply', 'candidate submission', 'resume submission',
                'cv submission', 'upload your resume', 'upload your cv', 'send your resume', 'send your cv',
                'apply for a job', 'apply for position', 'apply for role', 'apply for opening', 'apply for vacancy'
            ];
            return jobKeywords.some(keyword => message.includes(keyword));
        }

        // Method to check if message contains employee ticket keywords
        containsEmployeeTicketKeywords(message) {
            const employeeTicketKeywords = [
                'employee ticket', 'employee support', 'employee help', 'employee issue', 'employee problem',
                'it support', 'it ticket', 'raise it ticket', 'raise ticket', 'raise support ticket',
                'employee request', 'employee complaint', 'employee query', 'employee service',
                'internal support', 'internal ticket', 'workplace issue', 'workplace support',
                'workplace ticket', 'workplace help', 'workplace problem', 'workplace request',
                'workplace complaint', 'workplace query', 'workplace service', 'staff ticket',
                'staff support', 'staff help', 'staff issue', 'staff problem', 'staff request',
                'staff complaint', 'staff query', 'staff service', 'open employee ticket',
                'open staff ticket', 'open it ticket', 'open support ticket', 'open internal ticket'
            ];
            return employeeTicketKeywords.some(keyword => message.includes(keyword));
        }

        // Method to check if message contains customer ticket keywords
        containsCustomerTicketKeywords(message) {
            const customerTicketKeywords = [
                'customer ticket', 'customer support', 'customer help', 'customer issue', 'customer problem',
                'support ticket', 'raise ticket', 'raise support ticket', 'customer request',
                'customer complaint', 'customer query', 'customer service', 'external support',
                'external ticket', 'client ticket', 'client support', 'client help', 'client issue',
                'client problem', 'client request', 'client complaint', 'client query', 'client service',
                'open customer ticket', 'open client ticket', 'open support ticket', 'open external ticket',
                'open service ticket', 'open complaint ticket', 'open query ticket', 'open request ticket'
            ];
            return customerTicketKeywords.some(keyword => message.includes(keyword));
        }
    }

            // Auto-initialize
        function init() {
            // Create widget instance
            const widget = new MobiloliteWidget();
           
            // Make it globally accessible
            window.MobiloliteWidget = MobiloliteWidget;
            window.mobiloliteInstance = widget;
           
            // Allow external message handling
            window.addEventListener('mobiloliteMessage', (e) => {
                console.log('Mobilolite message received:', e.detail.message);
            });


        }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();