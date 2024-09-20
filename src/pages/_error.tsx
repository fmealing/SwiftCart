import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ErrorPage = ({ statusCode }: { statusCode: number }) => {
  const router = useRouter();

  // Optional: Auto-redirect after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // Redirect to homepage after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Clear timer on unmount
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-lg text-gray-600 mb-8">
          {statusCode === 404
            ? "Sorry, the page you are looking for could not be found."
            : "Sorry, something went wrong."}
        </p>

        <Link href="/">
          <p className="inline-block bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 transition duration-300">
            Go to Homepage
          </p>
        </Link>

        <p className="mt-4 text-sm text-gray-500">
          You will be redirected to the homepage in a few seconds.
        </p>
      </div>
    </div>
  );
};

// If the error page is rendered on the server, the statusCode is passed as a prop
ErrorPage.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
