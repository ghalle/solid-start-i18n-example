import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import { createEffect, untrack } from "solid-js";
import {
  Outlet,
  RouteDataArgs,
  useLocation,
  useParams,
  useRouteData,
} from "solid-start";
import { createServerData$, redirect } from "solid-start/server";

const dict = {
  fr: {
    hello: "bonjour {{ name }}, comment vas-tu ?",
    test: "c'est un test",
  },
  en: {
    hello: "hello {{ name }}, how are you?",
    test: "this is a test",
  },
};

export function routeData(routeArgs: RouteDataArgs) {
  return createServerData$(
    ([lang, pathname]) => {
      if (typeof dict[lang] !== "object") {
        throw redirect(pathname.replace(`${lang}`, "en"));
      }
      return { [lang]: dict[lang] };
    },
    {
      key: () => [
        routeArgs.params.lang,
        untrack(() => routeArgs.location.pathname),
      ],
    }
  );
}

export default function InternalizationLayout() {
  const params = useParams();
  const location = useLocation();
  const dict = useRouteData<typeof routeData>();
  const value = createI18nContext(dict(), params.lang);
  createEffect(() => {
    if (dict()[params.lang]) {
      value[1].add(params.lang, dict()[params.lang]);
      value[1].locale(params.lang);
    }
  });

  function localizedPathname(lang: string) {
    return location.pathname.replace(params.lang, lang);
  }

  return (
    <I18nContext.Provider value={value}>
      <div>
        <nav>
          <a href={`/${params.lang}`}>Home</a>
          <a href={`/${params.lang}/test/test`}>Test</a>
          <span style="float: right;">
            <a href={localizedPathname("en")}>English</a>
            <a href={localizedPathname("fr")}>French</a>
          </span>
        </nav>
        <Outlet />
      </div>
    </I18nContext.Provider>
  );
}
