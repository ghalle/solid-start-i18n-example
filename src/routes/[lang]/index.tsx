import { useI18n } from "@solid-primitives/i18n";
import { Title } from "solid-start";
import Counter from "~/components/Counter";

export default function Home() {
  const [t, { add, locale, dict }] = useI18n();
  return (
    <main>
      <Title>SolidStart i18n demo</Title>
      <h1>{t("hello", { name: "Bob" })}</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://docs.solidjs.com/start" target="_blank">
          docs.solidjs.com/start
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
