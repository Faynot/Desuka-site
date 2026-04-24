import { motion, Variants } from "framer-motion";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

const musicData = [
  {
    title: "Антигерой (--3_(+_+)_--3)",
    artist: "ДЖЕЙЛО",
    cover:
      "https://cdn-images.dzcdn.net/images/cover/3d77f66ce112fc22bb8daebf738b180e/500x500-000000-80-0-0.jpg",
    source: "/ДЖЕЙЛО - Антигерой (--3_(+_+)_--3).mp3",
  },
  {
    title: "Ария",
    artist: "ДЖЕЙЛО",
    cover:
      "https://images.genius.com/fb88d6cce85b9e0dc984a3a23ce2fc55.1000x1000x1.png",
    source: "/DZHEJJLO_-_Ariya_79893852.mp3",
  },
  {
    title: "Твои глаза",
    artist: "ДЖЕЙЛО",
    cover:
      "https://images.genius.com/fb88d6cce85b9e0dc984a3a23ce2fc55.1000x1000x1.png",
    source: "/DZHEJJLO_-_Tvoi_glaza_79012610.mp3",
  },
  {
    title: "Мальчик-гей",
    artist: "t.A.T.u",
    cover: "https://i.scdn.co/image/ab67616d0000b27330536ebc3b40f8598c2d0b19",
    source: "/tATu_-_Malchik-gejj_48274400.mp3",
  },
  {
    title: "All About Us",
    artist: "t.A.T.u",
    cover: "https://i.scdn.co/image/ab67616d0000b273523c4b95f7336c591bd6dbfc",
    source: "/tATu_-_All_About_Us_47837672.mp3",
  },
  {
    title: "Снегопады",
    artist: "t.A.T.u",
    cover:
      "https://images.genius.com/074cb9d908b5b085bc2ac5afd4ac3535.1000x1000x1.png",
    source: "/tATu_-_Snegopady_79526012.mp3",
  },
  {
    title: "Зима",
    artist: "KSB muzic",
    cover:
      "https://i1.sndcdn.com/artworks-XmE7getAySyPUwb6-ngOJyQ-t500x500.jpg",
    source: "/Ksb muzic - Зима (hitmos.fm).mp3",
  },
  {
    title: "Кладбище самолетов",
    artist: "Валентин Стрыкало",
    cover:
      "https://images.genius.com/3e375e9195a045c00f065ecb29f28e8c.1000x1000x1.png",
    source: "/Valentin_Strykalo_-_Kladbishhe_samoletov_47843574.mp3",
  },
  {
    title: "и в газоны, и в сугробы",
    artist: "ПОЛМАТЕРИ",
    cover: "https://i.scdn.co/image/ab67616d0000b273be601613fa44d2c380aaa227",
    source: "/POLMATERI_-_i_v_gazony_i_v_sugroby_73022840.mp3",
  },
  {
    title: "марафеты",
    artist: "dabbackwood",
    cover:
      "https://i1.sndcdn.com/artworks-eO7UvutFAOeH3eaq-ZAa7sg-t500x500.png",
    source: "/Dabbackwood_марафеты_новая_музыка_2025.mp3",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function MusicContent() {
  return (
    <div className="grid gap-4">
      {musicData.map((track, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MusicPlayer
            title={track.title}
            artist={track.artist}
            cover={track.cover}
            source={track.source}
          />
        </motion.div>
      ))}
    </div>
  );
}
