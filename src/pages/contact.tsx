import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("xgvwjvjy");

  if (state.succeeded) {
    return (
      <section className="min-h-screen bg-fixed bg-cover bg-center bg-contact">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              Thank you for reaching out!
            </h1>
            <p className="text-gray-600">
              Your message has been successfully sent. We will get back to you
              as soon as possible.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-fixed bg-cover bg-center bg-contact">
      <div className="bg-black bg-opacity-50 min-h-screen flex items-center justify-center">
        <div className="max-w-lg w-full text-center p-8 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            We&apos;d love to hear from you! Whether by carrier pigeon, smoke
            signal, or even email.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button
              type="submit"
              className="w-full bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition flex items-center justify-center"
              disabled={state.submitting}
            >
              <PaperAirplaneIcon className="h-5 w-5 mr-2 transform rotate-45" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
