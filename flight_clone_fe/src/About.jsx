import React from "react";

export default function About() {
  return (
    <>
      <div className="my-5 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
        <span className="lg:text-3xl md:text-2xl sm:text-xl font-bold mb-4">
          About Indore
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-base sm:text-xs md:text-sm lg:text-base">
              Indore is a city in west-central India. It’s known for the 7-story
              Rajwada Palace and the Lal Baag Palace, which date back to
              Indore’s 19th-century Holkar dynasty. The Holkar rulers are
              honored by a cluster of tombs and cenotaphs at Chhatri Baag. The
              night market Sarafa Bazar sells street food. East is the
              Indo-Gothic Gandhi Hall and clock tower. The Jain temple Kanch
              Mandir has a mirrored mosaic interior.
            </p>
          </div>

          <div>
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQp50HZYMeZ1Y5khQZ8A2eBtFpC0CYHnDvPE83xqEZouxROmbR2htgHoZcc69JX1fvMPOQxxzCYGkm6tzP0O4KohVDX9z8JSAdEWuoYig" // Replace with actual image URL
              alt="Indore"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Frequently Asked Questions Section */}
        <div className="mt-8">
          <span className="text-sm lg:text-2xl md:text-xl sm:text-base font-bold mb-4">
            Frequently asked questions about flying to Indore
          </span>

          <div className="mb-2">
            <details className="p-4 rounded-lg">
              <summary className="text-xs lg:text-xl md:text-base sm:text-sm font-semibold cursor-pointer">
                When should you visit Indore?
              </summary>
              <p className="mt-2 text-xs lg:text-xl md:text-base sm:text-sm">
                A common time to visit Indore is winter (Oct–Mar), when the days
                are warm and dry and nights are cool. Summer (Apr–May) gets very
                hot, with the occasional cooling evening breeze. The monsoon
                months (Jul–Sep) are wet and humid. Makar Sankranti (Jan) is a
                popular kite festival with competitions. Rangapanchami, when
                locals splash colored water at each other, comes 5 days after
                Holi (Mar). Anant Chaudas (Sep) features a procession of huge
                statues of Lord Ganesha.
              </p>
            </details>
            <hr className="my-2 border-gray-600" />
          </div>

          <div className="mb-2">
            <details className="p-4 rounded-lg">
              <summary className="text-xs lg:text-xl md:text-base sm:text-sm font-semibold cursor-pointer">
                What is the best airport to fly into Indore?
              </summary>
              <p className="mt-2 text-xs lg:text-xl md:text-base sm:text-sm">
                Indore is served by only one major airport: Devi Ahilyabai
                Holkar International Airport, Indore, 5 km away from the city
                center.
              </p>
            </details>
            <hr className="my-2 border-gray-600" />
          </div>

          <div className="mb-2">
            <details className="p-4 rounded-lg">
              <summary className="text-xs lg:text-xl md:text-base sm:text-sm font-semibold cursor-pointer">
                How can I find last-minute flight deals to Indore?
              </summary>
              <p className="mt-2 text-xs lg:text-xl md:text-base sm:text-sm">
                Finding last-minute flights to Indore is easy on Google Flights.
                Select your departure city and use the calendar to pick your
                preferred travel dates and find the lowest fares available. You
                can even check for flights departing today. To find the cheapest
                fares, it’s usually best to book at least a few weeks in advance
                for domestic flights and a few months in advance for
                international travel.
              </p>
            </details>
            <hr className="my-2 border-gray-600" />
          </div>

          <div className="mb-2">
            <details className="p-4 rounded-lg">
              <summary className="text-xs lg:text-xl md:text-base sm:text-sm font-semibold cursor-pointer">
                How can I find flights deals to Indore?
              </summary>
              <p className="mt-2 text-xs lg:text-xl md:text-base sm:text-sm">
                You can find great flight deals to Indore on Google Flights.
                Just enter your departure city, choose Indore in the destination
                field, and click Search. You can filter the results to see only
                nonstop flights or flights under a certain price to more easily
                plan your perfect budget trip. You can also turn on price
                tracking to get alerts if the price changes for a route or
                flight.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
