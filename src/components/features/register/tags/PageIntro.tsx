interface PageIntro {
  title: string;
  des: string;
}
const PageIntro = ({ title, des }: PageIntro) => {
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h3 className="text-md text-light-900 font-bold">{title}</h3>
      <p className="text-text-sm font-medium text-light-300">{des}</p>
    </div>
  );
};

export default PageIntro;
