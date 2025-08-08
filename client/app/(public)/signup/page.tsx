import PrivacyLink from "@/components/auth/privacyLink";
import SignupForm from "@/components/auth/signupForm";

const SignupPage: React.FC = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6">
      <SignupForm />
      <PrivacyLink />
    </div>
  );
};

export default SignupPage;
