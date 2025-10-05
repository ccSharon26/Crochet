import Title from "../components/Title";

const About = () => {
  return (
    <div className="px-6 md:px-20 py-10">
      {/* ABOUT SECTION */}
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full max-w-[450px] rounded-lg shadow-md"
          src="frontend_assets/about_img.png"
          alt="About Carl Crochet"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 leading-relaxed">
          <p>
            At <span className="font-semibold text-pink-600">CarlCrochet</span>, 
            we believe fashion should feel personal, cozy, and full of character. 
            Every piece we create is handmade with love, blending tradition and 
            modern style to give you something truly unique.
          </p>

          <p>
            What started as a passion for crochet has grown into a brand that 
            celebrates craftsmanship, creativity, and comfort. Whether it’s a 
            bold statement piece or a timeless everyday essential, our collection 
            is designed to make you feel confident and stylish.
          </p>

          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            To bring warmth, authenticity, and artistry into wardrobes everywhere. 
            With CarlCrochet, you’re not just wearing clothes — you’re wearing 
            stories carefully woven into every stitch.
          </p>
        </div>
      </div>

      {/* WHY US SECTION */}
      <div className="text-4xl py-6 text-center">
        <Title text1={"WHY"} text2={"US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-6 justify-center">
        <div className="border rounded-lg shadow-sm px-10 md:px-16 py-10 flex flex-col gap-5 hover:shadow-md transition">
          <b className="text-pink-600">Quality Assurance</b>
          <p>
            Each crochet piece is handcrafted with premium materials to ensure 
            durability, comfort, and a flawless finish.
          </p>
        </div>

        <div className="border rounded-lg shadow-sm px-10 md:px-16 py-10 flex flex-col gap-5 hover:shadow-md transition">
          <b className="text-pink-600">Convenience</b>
          <p>
            Shop your favorite designs online and have them delivered straight 
            to your doorstep — hassle-free, anytime.
          </p>
        </div>

        <div className="border rounded-lg shadow-sm px-10 md:px-16 py-10 flex flex-col gap-5 hover:shadow-md transition">
          <b className="text-pink-600">Exceptional Customer Service</b>
          <p>
            We value every client. From order to delivery, our support team is 
            here to ensure you have the best CarlCrochet experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
