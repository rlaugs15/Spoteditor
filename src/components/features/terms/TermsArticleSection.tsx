interface TermsArticleProps {
  title: string;
  description?: string;
  items?: unknown;
}

export default function TermsArticleSection({ title, description, items }: TermsArticleProps) {
  const parsedItems = Array.isArray(items) ? (items as (string | string[])[]) : [];

  return (
    <>
      <h3 className="font-semibold">{title}</h3>
      {description && <p>{description}</p>}
      <ul className="pl-5 space-y-1">
        {parsedItems.map((item, idx) =>
          Array.isArray(item) ? (
            <ul key={idx} className="list-disc pl-5 space-y-1">
              {item.map((subItem, subIdx) => (
                <li key={subIdx}>{subItem}</li>
              ))}
            </ul>
          ) : (
            <li key={idx}>
              {typeof item === 'string' && item.includes('\n')
                ? item.split('\n').map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i !== arr.length - 1 && <br />}
                    </span>
                  ))
                : item}
            </li>
          )
        )}
      </ul>
    </>
  );
}
