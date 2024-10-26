import LottieLoading from "@/components/ui/LottieLoading";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";

interface PrivateRouteProps {
  redirectPath?: string;
}

const WithAuth = <P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>,
  { redirectPath = "/auth/signin" }: PrivateRouteProps = {}
) => {
  const AuthenticatedRoute: React.FC<P> = (props) => {
    const router = useRouter();
    const { authenticated, authenticating } = useSession();
    useEffect(() => {
      if (!authenticated && !authenticating) {
        router.replace(redirectPath);
      }
    }, [authenticated, router, authenticating]);

    if (authenticating || !authenticated) {
      return (
        <div className="flex items-center justify-center w-full h-screen">
          <LottieLoading />
        </div>
      );
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedRoute;
};

export default WithAuth;
