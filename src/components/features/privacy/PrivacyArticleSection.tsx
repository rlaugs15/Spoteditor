interface PrivacyArticleSectionProps {
  title: string;
  description?: string;
  items?: string[];
}

export default function PrivacyArticleSection({
  title,
  description,
  items,
}: PrivacyArticleSectionProps) {
  return (
    <>
      <h3 className="font-semibold">{title}</h3>
      {description && <p>{description}</p>}

      {items && (
        <ul className="pl-5 space-y-1">
          {items.map((item, idx) => (
            <li key={idx}>
              {item.includes('\n')
                ? item.split('\n').map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i !== arr.length - 1 && <br />}
                    </span>
                  ))
                : item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
