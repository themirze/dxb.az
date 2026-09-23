export type Difficulty = "beginner" | "easy" | "medium" | "hard" | "extreme";

export interface LinuxTask {
  id: number;
  difficulty: Difficulty;
  answers: string[];
  az: { title: string; question: string; hint: string };
  en: { title: string; question: string; hint: string };
}

export const linuxTasks: LinuxTask[] = [
  {
    id: 1,
    difficulty: "beginner",
    answers: ["ls"],
    az: { title: "Faylları göstər", question: "Cari qovluqdakı faylları və qovluqları siyahıya al.", hint: "Ən sadə əmr, heç bir flag lazım deyil." },
    en: { title: "List files", question: "List the files and directories in the current folder.", hint: "The simplest command here — no flags needed." },
  },
  {
    id: 2,
    difficulty: "beginner",
    answers: ["cd projects"],
    az: { title: "Qovluğa keç", question: "`projects` adlı qovluğa keç.", hint: "`cd` + qovluğun adı." },
    en: { title: "Change directory", question: "Move into a directory called `projects`.", hint: "`cd` + the folder name." },
  },
  {
    id: 3,
    difficulty: "beginner",
    answers: ["cat notes.txt"],
    az: { title: "Fayl məzmununu oxu", question: "`notes.txt` faylının məzmununu ekranda göstər.", hint: "`cat` + fayl adı." },
    en: { title: "Read a file", question: "Print the contents of `notes.txt` to the screen.", hint: "`cat` + the file name." },
  },
  {
    id: 4,
    difficulty: "beginner",
    answers: ["mkdir backup"],
    az: { title: "Qovluq yarat", question: "`backup` adlı yeni qovluq yarat.", hint: "`mkdir` + qovluğun adı." },
    en: { title: "Create a folder", question: "Create a new folder named `backup`.", hint: "`mkdir` + the folder name." },
  },
  {
    id: 5,
    difficulty: "beginner",
    answers: ["cd .."],
    az: { title: "Yuxarı qovluğa qayıt", question: "Bir səviyyə yuxarı qovluğa keç.", hint: "İki nöqtə (..) ana qovluğu bildirir." },
    en: { title: "Go up a directory", question: "Move one directory level up.", hint: "Two dots (..) mean the parent folder." },
  },
  {
    id: 6,
    difficulty: "easy",
    answers: ["ls -a"],
    az: { title: "Gizli faylları göstər", question: "Gizli fayllar daxil olmaqla bütün faylları göstər.", hint: "`-a` = all." },
    en: { title: "Show hidden files", question: "List all files, including hidden ones.", hint: "`-a` = all." },
  },
  {
    id: 7,
    difficulty: "easy",
    answers: ["ls -l"],
    az: { title: "Detallı siyahı", question: "Faylları detallı formatda (icazələr, sahib, ölçü, tarix) göstər.", hint: "`-l` = long format." },
    en: { title: "Detailed listing", question: "List files in long/detailed format (permissions, owner, size, date).", hint: "`-l` = long format." },
  },
  {
    id: 8,
    difficulty: "easy",
    answers: ["wc -l log.txt", "wc -l < log.txt"],
    az: { title: "Sətirləri say", question: "`log.txt` faylındakı sətirlərin sayını hesabla.", hint: "`-l` = lines (sətirlər)." },
    en: { title: "Count lines", question: "Count how many lines are in `log.txt`.", hint: "`-l` = lines." },
  },
  {
    id: 9,
    difficulty: "easy",
    answers: ["mv old.txt new.txt"],
    az: { title: "Faylın adını dəyiş", question: "`old.txt` faylının adını `new.txt` olaraq dəyiş.", hint: "`mv` həm köçürmə, həm də adı dəyişmək üçündür." },
    en: { title: "Rename a file", question: "Rename `old.txt` to `new.txt`.", hint: "`mv` is used both to move and to rename files." },
  },
  {
    id: 10,
    difficulty: "easy",
    answers: ["cd ~"],
    az: { title: "Ev qovluğuna keç", question: "İstifadəçinin əsas (home) qovluğuna keç.", hint: "Tilda (~) ev qovluğunu bildirir." },
    en: { title: "Go home", question: "Go to the user's home directory.", hint: "The tilde (~) means the home directory." },
  },
  {
    id: 11,
    difficulty: "medium",
    answers: ["ls -t"],
    az: { title: "Tarixə görə sırala", question: "Faylları son dəyişmə tarixinə görə sırala.", hint: "`-t` = time." },
    en: { title: "Sort by date", question: "Sort files by their last modified date.", hint: "`-t` = time." },
  },
  {
    id: 12,
    difficulty: "medium",
    answers: ["ls -lh"],
    az: { title: "Oxunaqlı ölçülər", question: "Fayl ölçülərini insan oxuya bilən formatda (KB, MB, GB) göstər.", hint: "`-l` ilə `-h`-i birlikdə istifadə et." },
    en: { title: "Human-readable sizes", question: "Show file sizes in a human-readable format (KB, MB, GB).", hint: "Combine `-l` with `-h`." },
  },
  {
    id: 13,
    difficulty: "medium",
    answers: ["mkdir -p parent/child"],
    az: { title: "İç-içə qovluqlar", question: "`parent` mövcud olmasa belə, tək əmrlə `parent/child` qovluqlarını yarat.", hint: "`-p` ana qovluqları avtomatik yaradır." },
    en: { title: "Nested folders", question: "Create nested folders `parent/child` in one command, even if `parent` doesn't exist yet.", hint: "`-p` creates parent folders automatically." },
  },
  {
    id: 14,
    difficulty: "medium",
    answers: ["cat >> file.txt"],
    az: { title: "Fayla əlavə et", question: "`file.txt` faylının sonuna yeni məlumat əlavə et.", hint: "`>>` sona əlavə edir, tək `>` isə üzərinə yazır." },
    en: { title: "Append to a file", question: "Append new text to the end of `file.txt`.", hint: "`>>` appends; a single `>` would overwrite instead." },
  },
  {
    id: 15,
    difficulty: "medium",
    answers: ["mv -i file.txt /backup/"],
    az: { title: "Təhlükəsiz köçürmə", question: "`file.txt` faylını `/backup/` qovluğuna köçür, üzərinə yazmadan əvvəl təsdiq istəsin.", hint: "`-i` = interactive." },
    en: { title: "Safe move", question: "Move `file.txt` into `/backup/`, asking for confirmation before overwriting anything.", hint: "`-i` = interactive." },
  },
  {
    id: 16,
    difficulty: "hard",
    answers: ["cat file1.txt file2.txt > merged.txt"],
    az: { title: "Faylları birləşdir", question: "`file1.txt` və `file2.txt` fayllarını birləşdirib `merged.txt` adlı yeni fayl yarat.", hint: "`>` çıxışı yeni fayla yönləndirir." },
    en: { title: "Merge files", question: "Merge `file1.txt` and `file2.txt` into a new file called `merged.txt`.", hint: "`>` redirects output into a new file." },
  },
  {
    id: 17,
    difficulty: "hard",
    answers: ["ls -R"],
    az: { title: "Rekursiv siyahı", question: "Cari qovluq və bütün alt qovluqlardakı faylları rekursiv şəkildə göstər.", hint: "Böyük `R` = recursive (kiçik `-r` isə sadəcə siyahını tərsinə çevirir)." },
    en: { title: "Recursive listing", question: "Recursively list every file in the current folder and all its subfolders.", hint: "Capital `R` = recursive (lowercase `-r` just reverses the order)." },
  },
  {
    id: 18,
    difficulty: "hard",
    answers: ["rm -rf old_project"],
    az: { title: "Qovluğu zorla sil", question: "`old_project` adlı qovluğu bütün içindəkilərlə birlikdə zorla və rekursiv şəkildə sil. Diqqət: real sistemdə bu geri qaytarıla bilməz!", hint: "`-r` = recursive, `-f` = force." },
    en: { title: "Force delete a folder", question: "Forcefully and recursively delete a folder named `old_project`. Careful: on a real system this is irreversible!", hint: "`-r` = recursive, `-f` = force." },
  },
  {
    id: 19,
    difficulty: "extreme",
    answers: ["su -"],
    az: { title: "Tam root keçidi", question: "Root istifadəçisinə onun tam mühitini (environment) yükləyərək keç — sadəcə `sudo su` yox.", hint: "Defisə (-) diqqət et." },
    en: { title: "Full root switch", question: "Switch to the root user while loading root's full environment — not just `sudo su`.", hint: "Pay attention to the dash (-)." },
  },
  {
    id: 20,
    difficulty: "extreme",
    answers: ["rmdir -p parent/child/grandchild"],
    az: { title: "İç-içə boş qovluqları sil", question: "`parent/child/grandchild` boş qovluqlarının hamısını tək əmrlə, aşağıdan yuxarı sil.", hint: "`-p` boş ana qovluqları da silir." },
    en: { title: "Remove nested empty folders", question: "Remove the empty nested directories `parent/child/grandchild` all at once, bottom to top.", hint: "`-p` also removes empty parent folders." },
  },
];
