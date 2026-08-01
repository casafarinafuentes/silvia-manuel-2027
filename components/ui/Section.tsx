type SectionProps = {
  children: React.ReactNode;
};

export default function Section({ children }: SectionProps) {
  return (
    <section className="py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {children}
      </div>
    </section>
  );
}