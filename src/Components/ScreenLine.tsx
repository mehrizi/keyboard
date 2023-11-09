
export function ScreenLine({ line }) {
  const createMarkup = () => ({ __html: line });

  return <div className="history"  dangerouslySetInnerHTML={createMarkup()} />;
 
}
