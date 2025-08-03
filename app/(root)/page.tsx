export default function Home() {
  return (
    <section className="w-full h-full flex flex-col items-start justify-start gap-4 py-8 md:py-10">
      <div className="inline-block max-w-3xl text-left justify-center leading-[4]">
        <span className="text-gray-700 text-4xl md:text-6xl font-bold">
          Seamless Travelling Across the City With{" "}
          <span className="px-2 text-white bg-gradient-to-r from-cyan-200 to-blue-300 ">Metro Rail</span>
        </span>

        <div className="p-2 w-[15.5rem] bg-gray-500 text-white leading-4 font-bold">
          Travel Faster with Rapid Pass
        </div>
      </div>
    </section>
  );
}
