export const Steps = () => {
  return (
    <section className="text-gray-400 body-font bg-[#0e121f] mt-10">
      <div className="container px-5 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          <div className=" md:pr-10 py-6">
            <h1 className=" text-3xl mb-10 text-white font-bold leading-tight text-center md:text-left ">
              Wie funktioniert das Seven vs. Wild Bingo?
            </h1>
            <div className="flex relative pb-12">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-green-700 mb-1 tracking-wider">
                  SCHRITT 1
                </h2>
                <p className="leading-relaxed">
                  Sende uns deine Ideen für das Seven vs. Wild Bingo. Überlege
                  dir hierfür einfach Ereignisse die in der zweiten Staffel von
                  Seven vs. Wild passieren könnten und schreibe sie in das
                  Formular.
                </p>
              </div>
            </div>
            <div className="flex relative pb-12">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-green-700 mb-1 tracking-wider">
                  SCHRITT 2
                </h2>
                <p className="leading-relaxed">
                  Erstelle dir dein eigenes Bingo-Board aus deinen und der
                  Community eingereichten Ideen. Du kannst hierbei selbst die
                  Ereignisse für die Bingo Felder auswählen. Anschließend
                  generieren wir für dich ein zufälliges Bingo-Board.
                </p>
              </div>
            </div>
            <div className="flex relative pb-12">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-green-700 mb-1 tracking-wider">
                  SCHRITT 3
                </h2>
                <p className="leading-relaxed">
                  Sobald die erste Folge von Seven vs. Wild veröffentlicht
                  wurde, beginnt das Bingo. Du bekommst Punkte für jedes Feld
                  auf dem Board das eingetreten ist. Den Gewinner des Bingos
                  ermitteln wir anhand der Punkte die du gesammelt hast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
