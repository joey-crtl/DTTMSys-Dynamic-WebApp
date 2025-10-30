import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

// Create ffmpeg instance
const ffmpeg = new FFmpeg();

async function loadFFmpeg() {
  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL: "https://unpkg.com/@ffmpeg/core-mt@latest/dist/ffmpeg-core.js",
      wasmURL: "https://unpkg.com/@ffmpeg/core-mt@latest/dist/ffmpeg-core.wasm",
      workerURL: "https://unpkg.com/@ffmpeg/core-mt@latest/dist/ffmpeg-core.worker.js",
    });
  }
}

export async function compressVideo(file) {
  await loadFFmpeg();

  const inputName = "input.mp4";
  const outputName = "output.mp4";

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  await ffmpeg.exec([
    "-i", inputName,
    "-vcodec", "libx264",
    "-b:v", "800k",
    "-acodec", "aac",
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);

  return new File([data], "compressed.mp4", { type: "video/mp4" });
}

export async function compressImage(file) {
  // TODO: add real image compression later
  return file;
}
