import Title from "../components/Title";
import { MdEmail, MdPhone } from "react-icons/md";

const Contact = () => {
  return (
    <div className="px-6 md:px-20 pt-16">
      {/* HEADER */}
      <div className="text-2xl text-center border-t pt-10">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* MAIN CONTENT */}
      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28">
        {/* Image */}
        <img
          className="w-full md:max-w-[480px] rounded-lg shadow-md"
          src="frontend_assets/contact_img.png"
          alt="Contact Carl Crochet"
        />

        {/* Info */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-700">We’d love to hear from you!</p>
          <p className="text-gray-600">
            Reach us directly through phone, email, or social media. We’ll get back to you as soon as possible.
          </p>

          {/* Contact Info */}
          <div className="space-y-2 text-gray-600">
            <p className="flex items-center">
              <MdPhone className="mr-2 text-pink-500" /> +254 712 345 678
            </p>
            <p className="flex items-center">
              <MdEmail className="mr-2 text-pink-500" /> carlcrochet@gmail.com
            </p>
          </div>

          {/* Socials */}
          <div>
            <p className="font-semibold text-lg text-gray-700 mb-2">Follow Us</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <img
                  src="frontend_assets/instagram.png"
                  alt="Instagram"
                  className="w-5 h-5"
                />
                <a href="https://instagram.com/carlcrochet" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  @carlcrochet
                </a>
              </li>
              <li className="flex items-center gap-2">
                <img
                  src="frontend_assets/facebook.png"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                <a href="https://facebook.com/carlcrochet" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  Carl Crochet
                </a>
              </li>
              <li className="flex items-center gap-2">
                <img
                  src="frontend_assets/twitter.png"
                  alt="Twitter"
                  className="w-5 h-5"
                />
                <a href="https://twitter.com/carlcrochet" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  @carlcrochet
                </a>
              </li>
              <li className="flex items-center gap-2">
                <img
                  src="frontend_assets/tiktok.png"
                  alt="TikTok"
                  className="w-5 h-5"
                />
                <a href="https://tiktok.com/@carlcrochet" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  @carlcrochet
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
