/* global LocoModel */

const { Config, Models } = LocoModel;

Config.protocolWithHost = window.location.origin;

class Article extends Models.Base {
  static identity = "Article";

  static resources = {
    url: "/articles",
    paginate: { per: 2 },
  };

  static attributes = {
    title: {
      type: "String",
      validations: {
        presence: true,
        length: { minimum: 3 },
      },
    },
    publishedAt: {
      remoteName: "published_at",
      type: "Date",
    },
  };
}

// --- playground ------------------------------------------------------------
// Add an entry here and it shows up as a button. Whatever you return is logged.

const actions = {
  "all (paginates)": () => Article.all(),

  "find(2)": () => Article.find(2),

  "find(999) → null": () => Article.find(999),

  "save (valid)": async () => {
    const article = new Article({ title: "Written from the playground" });
    if (article.isInvalid()) return article.errors;
    return article.save();
  },

  "save (invalid locally)": () => {
    const article = new Article({ title: "ab" });
    article.isValid();
    return article.errors;
  },

  "save (rejected by server)": () => new Article({ title: "" }).save(),

  updateAttribute: async () => {
    const article = await Article.find(1);
    article.title = `Renamed at ${new Date().toLocaleTimeString()}`;
    return article.updateAttribute("title");
  },

  "delete(3)": () => Article.find(3).then((article) => article.delete()),
};

// --- wiring ----------------------------------------------------------------

const log = (label, value) => {
  const output = document.getElementById("log");
  output.textContent = `${label}\n\n${JSON.stringify(value, null, 2)}\n\n${output.textContent}`;
  console.log(label, value);
};

for (const [label, run] of Object.entries(actions)) {
  const button = document.createElement("button");
  button.textContent = label;
  button.onclick = async () => {
    try {
      log(label, await run());
    } catch (e) {
      log(`${label} — FAILED`, String(e));
    }
  };
  document.getElementById("actions").append(button);
}
