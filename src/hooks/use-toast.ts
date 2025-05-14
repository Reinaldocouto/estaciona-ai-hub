
// Reexport useToast from Radix UI
import { toast as sonnerToast } from 'sonner';

// This type is based on the options available in the Sonner toast
type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
  duration?: number;
};

// We're creating a wrapper for the Radix toast API to make it compatible with how it's used in the app
export const toast = ({ title, description, action, ...props }: ToastProps) => {
  return sonnerToast(title, {
    description,
    action,
    ...props,
  });
};

// For TypeScript
export function useToast() {
  return {
    toast,
    toasts: [] as any[],
  };
}

export default useToast;
