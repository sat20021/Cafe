import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '../utils/helpers';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic API call function
  const callApi = useCallback(async (apiFunction, options = {}) => {
    const {
      showLoading = true,
      showError = true,
      showSuccess = false,
      successMessage = 'Operation completed successfully',
      retryCount = 0,
      retryDelay = 1000
    } = options;

    if (showLoading) {
      setLoading(true);
    }
    setError(null);

    try {
      const result = await apiFunction();
      
      if (showSuccess) {
        toast.success(successMessage);
      }
      
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      
      if (showError) {
        toast.error(errorMessage);
      }

      // Retry logic
      if (retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return callApi(apiFunction, { ...options, retryCount: retryCount - 1 });
      }

      throw err;
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    callApi,
    clearError
  };
};

export default useApi; 