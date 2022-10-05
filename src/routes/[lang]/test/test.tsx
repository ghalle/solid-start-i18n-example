import { useI18n } from "@solid-primitives/i18n";
import { Title } from "solid-start";

export default function Home() {
  const [t, { add, locale, dict }] = useI18n();
  return (
    <main>
      <Title>SolidStart i18n demo</Title>
      <h1>{t("test")}</h1>
    </main>
  );
}
