export default function HoverLiftCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg rounded-xl p-4 bg-white">
      {children}
    </div>
  );
}
