import { signIn } from "@/auth.server";

const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("credentials", {
          redirectTo: "/dashboard",
        });
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
