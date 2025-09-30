import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px] rounded-lg shadow-md"
          src="frontend_assets/contact_img.png"
          alt="Contact Carl Crochet"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-700">We’d love to hear from you!</p>
          <p className="text-gray-600">
            Reach us directly through phone, email, or social media.
          </p>

          {/* Contact Info */}
          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium">Tel:</span> +254 712 345 678</p>
            <p><span className="font-medium">Email:</span> carlcrochet@gmail.com</p>
          </div>

          {/* Socials */}
          <div>
            <p className="font-semibold text-lg text-gray-700 mb-2">Follow Us</p>
            <ul className="space-y-1 text-gray-600">
              <li>📸 Instagram: <a href="https://instagram.com/carlcrochet" target="_blank" className="text-blue-600 hover:underline">@carlcrochet</a></li>
              <li>📘 Facebook: <a href="https://facebook.com/carlcrochet" target="_blank" className="text-blue-600 hover:underline">Carl Crochet</a></li>
              <li>🐦 Twitter: <a href="https://twitter.com/carlcrochet" target="_blank" className="text-blue-600 hover:underline">@carlcrochet</a></li>
              <li>🎵 TikTok: <a href="https://tiktok.com/@carlcrochet" target="_blank" className="text-blue-600 hover:underline">@carlcrochet</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
