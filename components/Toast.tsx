"use client";

type Props = {
  message: string;
  visible: boolean;
};

export default function Toast({ message, visible }: Props) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-full shadow-lg text-sm font-medium animate-fade-in z-50">
      {message}
    </div>
  );
}
