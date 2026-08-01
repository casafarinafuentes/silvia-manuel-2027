type SectionProps = {
  children: React.ReactNode;
};

export default function Section({
  children,
}: SectionProps) {
  return (
    <section className="py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1500px] px-5 lg:px-8">
        {children}
      </div>
    </section>
  );
}