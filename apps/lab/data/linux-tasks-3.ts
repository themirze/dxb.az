import { dir, file } from "@/lib/vfs";
import type { LinuxTask2 } from "@/data/linux-tasks-2";

export type LinuxTask3 = LinuxTask2;

export const linuxTasks3: LinuxTask3[] = [
  {
    id: 1,
    difficulty: "hard",
    password: "silentRaven042",
    filesystem: dir({
      vault: dir({
        fragments: dir({
          "frag_one.txt": file("silent"),
          "frag_two.txt": file("042"),
          "frag_three.txt": file("Raven"),
        }),
        "order.txt": file("Correct order: frag_one.txt + frag_three.txt + frag_two.txt"),
      }),
    }),
    az: {
      title: "Sıra pozulub",
      description:
        "`vault/fragments` qovluğunda şifrənin üç parçası var, amma sırası qarışıb. Əvvəl `vault/order.txt` faylını oxu ki, doğru sıranı öyrənəsən, sonra hər parçanı oxu və onları (boşluqsuz) düzgün sırada birləşdirərək yekun şifrəni yaz.",
    },
    en: {
      title: "Fragments out of order",
      description:
        "Inside `vault/fragments` there are three password fragments, but they're shuffled. First read `vault/order.txt` to learn the correct order, then read each fragment and combine them (no spaces) in that order to get the final password.",
    },
  },
  {
    id: 2,
    difficulty: "hard",
    password: "shadowPulse22",
    filesystem: dir({
      servers: dir({
        web: dir({
          "access.log": file(Array.from({ length: 13 }, (_, i) => `2026-02-${String(i + 1).padStart(2, "0")} GET /index.html 200`).join("\n")),
        }),
        db: dir({
          ".shadow.log": file(
            Array.from({ length: 12 }, (_, i) => `2026-02-${String(i + 1).padStart(2, "0")} auth check ok`).join("\n") + "\nPassword: shadowPulse22"
          ),
          "error.log": file(Array.from({ length: 20 }, (_, i) => `2026-02-${String(i + 1).padStart(2, "0")} minor warning`).join("\n")),
        }),
        cache: dir({
          "trace.log": file(Array.from({ length: 8 }, (_, i) => `2026-02-${String(i + 1).padStart(2, "0")} cache hit`).join("\n")),
        }),
      }),
    }),
    az: {
      title: "Gizli iynə",
      description:
        "`servers` qovluğunun üç alt qovluğunda bir neçə log faylı var. Şifrə düz 13 sətri olan gizli (nöqtə ilə başlayan) faylda gizlənib — amma görünən fayllardan birinin də tam 13 sətri var, ona görə sadəcə sətir sayı kifayət etmir. `ls -a` ilə gizli faylları aşkar et, `wc -l` ilə say, sonra məzmunu diqqətlə oxu.",
    },
    en: {
      title: "The hidden needle",
      description:
        "Somewhere across the three subfolders inside `servers`, there's a hidden (dot-prefixed) log file with exactly 13 lines that holds the password — but a visible file also happens to have exactly 13 lines with no password, so line-counting alone won't cut it. Use `ls -a` to reveal hidden files, `wc -l` to count, then read the actual contents carefully.",
    },
  },
  {
    id: 3,
    difficulty: "extreme",
    password: "cobaltNova19",
    requiredPaths: [{ path: ["project_v2", "src", "config.py"], type: "file" }],
    forbiddenPaths: [["project_v1"]],
    filesystem: dir({
      project_v1: dir({
        src: dir({
          "main.py": file("print('hello')"),
          "config.py": file("API_KEY=demo\nPassword: cobaltNova19"),
        }),
        "readme.md": file("Legacy project, being replaced by v2."),
      }),
    }),
    az: {
      title: "Kəsmədən əvvəl köçür",
      description:
        "`project_v1/src/config.py` faylındakı şifrəni tap. Sonra bütün `project_v1` qovluğunu tam olaraq (rekursiv) `project_v2` adı ilə köçür (`cp -r`), və nəhayət `project_v1` qovluğunu tamamilə sil (`rm -rf`). Sonda yalnız `project_v2` qalmalıdır.",
    },
    en: {
      title: "Copy before you cut",
      description:
        "Find the password hidden inside `project_v1/src/config.py`. Then recursively copy the entire `project_v1` folder into a new folder named `project_v2` (`cp -r`), and finally delete `project_v1` completely (`rm -rf`). Only `project_v2` should remain at the end.",
    },
  },
  {
    id: 4,
    difficulty: "extreme",
    password: "emberFox88",
    requiredPaths: [
      { path: ["company", "reports", "2026", "q1", "summary.txt"], type: "file" },
      { path: ["company", "reports", "2026", "q2", "summary.txt"], type: "file" },
    ],
    forbiddenPaths: [["company", "reports", "2025"]],
    filesystem: dir({
      company: dir({
        reports: dir({
          "2025": dir({
            "notes.txt": file("Old fiscal year archive.\nPassword: emberFox88"),
            "draft.txt": file("draft content, nothing important."),
          }),
        }),
      }),
    }),
    az: {
      title: "Köhnə maliyyə ilini bağla",
      description:
        "Əvvəlcə `company/reports/2025/notes.txt` faylındakı şifrəni tap. Sonra bütün `2025` qovluğunu sil (`rm -rf`) və yeni quruluş qur: `mkdir -p` ilə `company/reports/2026/q1` və `company/reports/2026/q2` qovluqlarını yarat, hər birinin içində boş `summary.txt` faylı olsun (`touch` və ya `echo`).",
    },
    en: {
      title: "Close out the old fiscal year",
      description:
        "First find the password hidden inside `company/reports/2025/notes.txt`. Then delete the entire `2025` folder (`rm -rf`), and build a fresh structure: use `mkdir -p` to create `company/reports/2026/q1` and `company/reports/2026/q2`, each containing an empty `summary.txt` file (`touch` or `echo`).",
    },
  },
  {
    id: 5,
    difficulty: "extreme",
    password: "obsidianKey77",
    requiredPaths: [{ path: ["new_hideout", "proof.txt"], type: "file" }],
    forbiddenPaths: [["old_hideout"]],
    filesystem: dir({
      heist: dir({
        clues: dir({
          "hint.txt": file("The real password lives inside the vault's hidden ledger. Check inside `vault/.ledger`."),
          "decoy1.txt": file("Password: fakeGold00 (this is a trap, don't use it)"),
        }),
        vault: dir({
          ".ledger": file("Real password: obsidianKey77"),
          "guard.txt": file("Guard notes: nothing useful here, move along."),
        }),
      }),
      old_hideout: dir({
        "trash1.txt": file("junk"),
        "trash2.txt": file("junk"),
      }),
    }),
    az: {
      title: "Son quldurluq",
      description:
        "`heist/clues/hint.txt` faylını oxu — orada əsl şifrənin harada gizləndiyinə dair ipucu var (eyni qovluqdakı `decoy1.txt` isə tələdir, ona məhəl qoyma). İpucunun göstərdiyi gizli fayldan əsl şifrəni tap. Şifrəni tapdıqdan sonra `old_hideout` qovluğunu tamamilə sil (`rm -rf`) və yeni `new_hideout` qovluğu yaradıb içində boş `proof.txt` faylı yarat.",
    },
    en: {
      title: "The final heist",
      description:
        "Read `heist/clues/hint.txt` — it points to where the real password is hidden (ignore `decoy1.txt` in the same folder, it's a trap). Find the real password inside the hidden file the hint points to. Once you have it, delete `old_hideout` completely (`rm -rf`), then create a new folder `new_hideout` with an empty `proof.txt` file inside it.",
    },
  },
];
