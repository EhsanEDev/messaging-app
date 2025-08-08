import PrivacyLink from "@/components/auth/privacyLink";
import SigninForm from "@/components/auth/signinForm";

const SigninPage: React.FC = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6">
      <SigninForm />
      <PrivacyLink />
    </div>
  );
};

export default SigninPage;
