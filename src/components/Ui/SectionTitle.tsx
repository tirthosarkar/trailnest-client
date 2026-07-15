interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const SectionTitle = ({
  title,
  subtitle,
  center = false,
}: SectionTitleProps) => {
  return (
    <div className={`${center ? 'text-center' : ''} mb-10`}>
      <h2 className="text-3xl font-bold text-[var(--dark)] md:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-[var(--text-secondary)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
