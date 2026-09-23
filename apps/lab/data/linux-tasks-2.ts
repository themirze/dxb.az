import { dir, file, type VDir } from "@/lib/vfs";

export type Difficulty = "beginner" | "easy" | "medium" | "hard" | "extreme";

export interface PathCheck {
  path: string[];
  type: "file" | "dir";
}

export interface LinuxTask2 {
  id: number;
  difficulty: Difficulty;
  filesystem: VDir;
  password?: string;
  requiredPaths?: PathCheck[];
  forbiddenPaths?: string[][];
  az: { title: string; description: string };
  en: { title: string; description: string };
}

export const linuxTasks2: LinuxTask2[] = [
  {
    id: 1,
    difficulty: "beginner",
    password: "sunflower123",
    filesystem: dir({
      project: dir({
        "README.txt": file("Welcome to the project. Check the config folder for setup details."),
        config: dir({
          "secret.txt": file("Password: sunflower123"),
        }),
      }),
    }),
    az: {
      title: "İlk qazma",
      description: "`project` qovluğuna keç, sonra `config` qovluğunu tap, `secret.txt` faylını oxu və tapdığın şifrəni aşağıya yaz.",
    },
    en: {
      title: "First dig",
      description: "Enter the `project` folder, find the `config` folder inside it, read `secret.txt`, and enter the password you find below.",
    },
  },
  {
    id: 2,
    difficulty: "beginner",
    password: "bluewhale77",
    filesystem: dir({
      inbox: dir({
        archive: dir({
          "2024": dir({
            "january.txt": file("Nothing interesting here, just old notes."),
            "access.txt": file("Password: bluewhale77"),
          }),
        }),
      }),
    }),
    az: {
      title: "Arxivə enmək",
      description: "`inbox → archive → 2024` qovluqlarının içinə gir və `access.txt` faylındakı şifrəni tap.",
    },
    en: {
      title: "Digging into the archive",
      description: "Navigate through `inbox → archive → 2024` and find the password inside `access.txt`.",
    },
  },
  {
    id: 3,
    difficulty: "easy",
    password: "hiddenGem42",
    filesystem: dir({
      workspace: dir({
        "notes.txt": file("Meeting notes: discuss Q3 roadmap."),
        ".secrets": dir({
          "key.txt": file("Password: hiddenGem42"),
        }),
      }),
    }),
    az: {
      title: "Gizli qovluq",
      description: "`workspace` qovluğunda adi `ls` heç nə vermir — gizli faylları da göstərən əmrdən istifadə et, gizli qovluğu tap və şifrəni oxu.",
    },
    en: {
      title: "The hidden folder",
      description: "A plain `ls` inside `workspace` won't show everything — use the flag that reveals hidden files, find the hidden folder, and read the password.",
    },
  },
  {
    id: 4,
    difficulty: "easy",
    password: "ironFalcon9",
    filesystem: dir({
      vault: dir({
        "todo.txt": file("Buy milk. Call mom. Finish report."),
        "notes.txt": file("Remember: standup at 10am."),
        "key.txt": file("Password: ironFalcon9"),
      }),
    }),
    az: {
      title: "Doğru faylı tap",
      description: "`vault` qovluğunda üç fayl var — hər birini oxu, şifrə hansındadırsa onu tap.",
    },
    en: {
      title: "Find the right file",
      description: "There are three files inside `vault` — read each one and figure out which one holds the password.",
    },
  },
  {
    id: 5,
    difficulty: "easy",
    requiredPaths: [
      { path: ["documents", "archive"], type: "dir" },
      { path: ["documents", "archive", "report.txt"], type: "file" },
    ],
    filesystem: dir({
      documents: dir({}),
    }),
    az: {
      title: "Qovluq quruluşu yarat",
      description: "`documents` qovluğunun içində `archive` adlı yeni qovluq yarat, sonra onun içində boş `report.txt` faylı yarat. Şifrə yoxdur — quruluş düzgün olanda tapşırıq avtomatik bitəcək.",
    },
    en: {
      title: "Build a folder structure",
      description: "Inside `documents`, create a new folder named `archive`, then create an empty file named `report.txt` inside it. No password this time — the task completes automatically once the structure is correct.",
    },
  },
  {
    id: 6,
    difficulty: "medium",
    password: "neonTiger3",
    requiredPaths: [{ path: ["backup", "db.conf"], type: "file" }],
    forbiddenPaths: [["configs", "db.conf"]],
    filesystem: dir({
      configs: dir({
        "db.conf": file("host=localhost\nPassword: neonTiger3"),
      }),
    }),
    az: {
      title: "Tap və köçür",
      description:
        "`configs/db.conf` faylındakı şifrəni tap və aşağıya yaz. Sonra kök qovluqda `backup` adlı qovluq yarat və `db.conf` faylını ora köçür.",
    },
    en: {
      title: "Find it, then move it",
      description:
        "Find the password inside `configs/db.conf` and enter it below. Then create a `backup` folder at the root and move `db.conf` into it.",
    },
  },
  {
    id: 7,
    difficulty: "medium",
    password: "crimsonEcho5",
    filesystem: dir({
      level1: dir({
        level2: dir({
          level3: dir({
            level4: dir({
              "treasure.txt": file("Password: crimsonEcho5"),
            }),
          }),
        }),
      }),
    }),
    az: {
      title: "Xəzinə axtarışı",
      description: "Şifrə dörd səviyyə dərinlikdə gizlənib: `level1 → level2 → level3 → level4`. `ls -R` sənə bütün quruluşu göstərə bilər.",
    },
    en: {
      title: "Treasure hunt",
      description: "The password is hidden four levels deep: `level1 → level2 → level3 → level4`. `ls -R` can show you the whole structure at once.",
    },
  },
  {
    id: 8,
    difficulty: "hard",
    password: "silverHawk1",
    requiredPaths: [{ path: ["new_folder", "secret.txt"], type: "file" }],
    forbiddenPaths: [["old_folder"]],
    filesystem: dir({
      old_folder: dir({
        "secret.txt": file("Password: silverHawk1"),
        "junk.txt": file("Delete me later, not important."),
      }),
    }),
    az: {
      title: "Adını dəyiş",
      description:
        "`old_folder` qovluğunun içindəki `secret.txt` faylından şifrəni tap. Sonra bütün qovluğun adını `new_folder` olaraq dəyiş (`mv`).",
    },
    en: {
      title: "Rename it",
      description:
        "Find the password inside `old_folder/secret.txt`. Then rename the entire folder to `new_folder` using `mv`.",
    },
  },
  {
    id: 9,
    difficulty: "hard",
    password: "obsidianWolf6",
    filesystem: dir({
      logs: dir({
        "jan.log": file(Array.from({ length: 9 }, (_, i) => `2024-01-${String(i + 1).padStart(2, "0")} service started`).join("\n") + "\nPassword: obsidianWolf6"),
        "feb.log": file(Array.from({ length: 5 }, (_, i) => `2024-02-${String(i + 1).padStart(2, "0")} heartbeat ok`).join("\n")),
        "mar.log": file(Array.from({ length: 20 }, (_, i) => `2024-03-${String(i + 1).padStart(2, "0")} heartbeat ok`).join("\n")),
      }),
    }),
    az: {
      title: "Sətirləri say",
      description:
        "`logs` qovluğunda üç fayl var. Şifrə düz 10 sətri olan fayldadır — hər faylı `wc -l` ilə yoxla, sonra doğru faylı oxu.",
    },
    en: {
      title: "Count the lines",
      description:
        "There are three files inside `logs`. The password is in the file with exactly 10 lines — check each one with `wc -l`, then read the right file.",
    },
  },
  {
    id: 10,
    difficulty: "extreme",
    password: "quantumRaven8",
    requiredPaths: [{ path: ["reports", "2026", "summary.txt"], type: "file" }],
    forbiddenPaths: [["old_project"]],
    filesystem: dir({
      old_project: dir({
        "junk1.txt": file("temporary file"),
        "junk2.txt": file("temporary file"),
      }),
      data: dir({
        hidden: dir({
          deep: dir({
            "final.txt": file("Password: quantumRaven8"),
          }),
        }),
      }),
    }),
    az: {
      title: "Yekun audit",
      description:
        "Üç addım: 1) `old_project` qovluğunu bütün içindəkilərlə zorla sil (`rm -rf`). 2) `data/hidden/deep/final.txt` içindəki şifrəni tap. 3) `mkdir -p` ilə `reports/2026` qovluqlarını yarat və `echo` ilə `reports/2026/summary.txt` faylını yarat.",
    },
    en: {
      title: "Final audit",
      description:
        "Three steps: 1) Forcefully delete `old_project` with `rm -rf`. 2) Find the password inside `data/hidden/deep/final.txt`. 3) Use `mkdir -p` to create `reports/2026`, then use `echo` to create `reports/2026/summary.txt`.",
    },
  },
];
