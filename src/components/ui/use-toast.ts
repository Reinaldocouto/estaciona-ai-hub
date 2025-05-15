
// Reexport useToast from sonner
import { toast as sonnerToast } from 'sonner';

// This type is based on the options available in the Sonner toast
type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
  duration?: number;
};

// We're creating a wrapper for the Sonner toast API
export const toast = ({ title, description, action, ...props }: ToastProps) => {
  return sonnerToast(title, {
    description,
    action,
    ...props,
  });
};

// For TypeScript compatibility with existing components
export function useToast() {
  return {
    toast,
    // This is an empty array since Sonner manages toast state internally
    toasts: [] as any[],
  };
}

export default useToast;
