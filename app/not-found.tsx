import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <section className="pt-32 pb-32 text-center bg-white transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Illustration Image */}
        <div className="mb-8 animate__animated animate__fadeIn">
          <Image
            src="https://th.bing.com/th/id/R.ff1a1a09fea3dd1c963b6c645c8ffd10?rik=lwNwL6w%2f2Syzgg&pid=ImgRaw&r=0"
            alt="404 Error Illustration"
            width={500}
            height={400}
            className="mx-auto"
            priority
          />
        </div>

        {/* Error Text */}
        <h1 className="text-4xl text-green-500 font-bold animate__animated animate__fadeIn" data-wow-delay=".2s">
          Message from Admin
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 animate__animated animate__fadeIn" data-wow-delay=".3s">
          This page is underconstruction
        </h2>
        <p className="text-gray-500 mb-8 animate__animated animate__fadeIn" data-wow-delay=".4s">
          our team is working hard to bring it to you soon. Meanwhile, you can explore other sections of our website.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-4 animate__animated animate__fadeIn"
          data-wow-delay=".5s"
        >
          <Link
            href="/"
            className="py-3 px-6 bg-green-500 text-white text-sm font-semibold rounded hover:bg-green-600 transition-all"
          >
            Go back to Homepage
          </Link>
          <Link
            href="/contact"
            className="py-3 px-6 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Custom404;
