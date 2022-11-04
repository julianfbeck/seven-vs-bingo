import { NextPage } from "next";
import { CustomHeader } from "../lib/CustomHeader";
import Navbar from "../lib/navbar";

const Bingo: NextPage = () => {
  return (
    <>
      <Navbar />
      <CustomHeader title="Dein 7 vs. Wild Bingo" />

      <main className="min-h-screen bg-black ">
        <div className="container mx-auto">
          <div className="pt-10 text-left max-w-screen-lg">
            <h1 className="pt-10  sm:px-16 xl:px-48 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500">
                About
              </span>
            </h1>
          </div>
          <div className="pt-10 text-left max-w-screen-lg p-2">
            <p className="text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400 ">
              7 vs. Wild Bingo ist eine Webseite, die von Fans für Fans erstellt
              wurde. Wir sind keine offizielle Seite und haben keinen Kontakt zu
              dem 7 vs. Wild Team. Wir hoffen ihr habt Spaß beim Spielen!
            </p>
            <p className="mt-5 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
              Die Webseite wurde erstellt von{" "}
              <a
                href="https://twitter.com/julianfbeck"
                className="underline decoration-lime-500 font-bold"
              >
                julianfbeck
              </a>{" "}
              .
            </p>
          </div>
          <h1 className="pt-10  sm:px-16 xl:px-48 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500">
              Datenschutz
            </span>
          </h1>
          <div className="text font-normal  sm:px-16 xl:px-48 text-gray-400 mt-10">
            <p>
              Bei sevenvsbingo.de, erreichbar über https://sevenvsbingo.de, ist
              eine unserer wichtigsten Prioritäten ist der Schutz der
              Privatsphäre unserer Besucher. Diese Datenschutzrichtlinie
              Dokument enthält Arten von Informationen, die von sevenvsbingo.de
              gesammelt und die von sevenvsbingo.de gesammelt und aufgezeichnet
              werden und wie wir sie verwenden.
            </p>
            <p className="text mt-2">
              Wenn Sie weitere Fragen haben oder mehr Informationen über unsere
              zögern Sie bitte nicht, uns zu kontaktieren.
            </p>
            <h2 className="text-lg mt-3 mb-3 font-bold">
              General Data Protection Regulation (GDPR)
            </h2>
            <p>Wir sind für die Verarbeitung Ihrer Daten verantwortlich.</p>
            <p>
              Die Rechtsgrundlage von Julian Beck für die Erhebung und
              Verwendung der Informationen, die in dieser Datenschutzrichtlinie
              beschrieben werden, hängt von den persönlichen Informationen, die
              wir sammeln, und dem spezifischen Kontext, in dem wir sie sammeln
              die Informationen:
            </p>
            <ul className="list-disc ml-10 mt-3">
              <li>Julian Beck muss einen Vertrag mit Ihnen erfüllen</li>
              <li>Sie haben Julian Beck die Erlaubnis dazu erteilt</li>
              <li>
                Die Verarbeitung Ihrer personenbezogenen Daten ist bei Julian
                Beck rechtmäßig Interessen
              </li>
              <li>Julian Beck muss sich an das Gesetz halten</li>
              <li>
                Julian Beck speichert Ihre E-Mail-Adresse nur, für das Login
                über TWITCH und DISCORD
              </li>
              <li>
                Julian Beck wird Ihnen keine Marketing- oder Werbe-E-Mails
                zusenden
              </li>
              <li>
                Keine Daten werden an Dritte weitergegeben, außer an Twitch und
                Discord für die Anmeldung über diese Plattformen.
              </li>
              <li>
                Sie können das löschen ihrer Daten jederzeit über eine E-Mail an
                mail@julianbeck.com verlangen
              </li>
            </ul>
            <p className="mt-3">
              Julian Beck speichert Ihre persönlichen Daten (E-Mail) nur solange
              dies für die in dieser Datenschutzerklärung dargelegten Zwecke
              erforderlich ist Politik. Wir werden Ihre Informationen in dem
              Umfang speichern und verwenden notwendig, um unseren gesetzlichen
              Verpflichtungen nachzukommen, Streitigkeiten beizulegen, und
              unsere Richtlinien durchzusetzen.
            </p>
            <p className="mt-3">
              Wenn Sie im Europäischen Wirtschaftsraum (EWR) ansässig sind,
              haben Sie bestimmte Datenschutzrechte. Wenn Sie informiert werden
              möchten, was Personenbezogene Daten, die wir über Sie gespeichert
              haben und wenn Sie dies wünschen aus unseren Systemen entfernt
              wurden, kontaktieren Sie uns bitte.
            </p>
            <p className="mt-3">
              Unter Umständen haben Sie folgende Datenschutzbestimmungen Rechte:
            </p>
            <ul className="list-disc ml-10 mt-3">
              <li>
                Das Recht, auf die uns vorliegenden Informationen zuzugreifen,
                sie zu aktualisieren oder zu löschen auf dich.
              </li>
              <li>Das Recht auf Berichtigung.</li>
              <li>Das Widerspruchsrecht.</li>
              <li>Das Recht auf Einschränkung.</li>
              <li>Das Recht auf Datenübertragbarkeit</li>
              <li>Das Recht auf Widerruf der Einwilligung</li>
            </ul>
            <h2 className="text-lg mt-3 mb-3 font-bold">
              Cookies and Web Beacons
            </h2>
            <p className="mt-3">
              Wie jede andere Website verwendet sevenvsbingo.de „Cookies“. Diese
              Cookies dienen lediglich für die Anmeldung über TWITCH und
              DISCORD.
            </p>
            <h2 className="text-lg mt-3 mb-3 font-bold">Zustimmung</h2>
            <p className="mt-3">
              Durch die Nutzung unserer Website stimmen Sie hiermit unserer
              Datenschutzrichtlinie zu und stimme seinen Bedingungen zu.
            </p>
            <h2 className="text-lg mt-3 mb-3 font-bold">Kontakt</h2>
            Für weitere Informationen kontaktieren Sie mich unter
            mail@julianbeck.com
          </div>
          <h1 className="pt-10  sm:px-16 xl:px-48 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500">
              Impressum
            </span>
          </h1>
          <p className="text font-normal  sm:px-16 xl:px-48 text-gray-400 mt-10">
            Julian Beck <br />
            Erich-Heckel Weg 1 <br />
            71679 Asperg <br />
            Deutschland <br />
            E-Mail:
            <a href="mailto:mail@julianbeck.com">mail@julianbeck.com</a>
          </p>
        </div>
      </main>
    </>
  );
};

export default Bingo;
