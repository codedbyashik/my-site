import Link from "next/link";

interface CTAButtonProps {
  text: string;
  href: string;
}

export default function CTAButton({ text, href }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className="px-6 py-3 bg-yellow-400/20 backdrop-blur-md rounded-lg text-white font-semibold shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all duration-300"
    >
      {text}
    </Link>
  );
}
