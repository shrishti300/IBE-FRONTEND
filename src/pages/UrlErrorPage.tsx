import './UrlErrorPage.scss'
export default function UrlErrorPage() {
    const goToHomePage = () => {
        window.location.href = "/";
      };
    
      const goBack = () => {
        window.location.href = "/";

      };
  return (
    <div className='errorpage_main'>
    <div className="errorpage">
    <p className="errorpage_title">Error: Invalid URL Parameters</p>
    <p className="errorpage_error">The URL parameters are invalid or missing.</p>
    <div className="errorpage_button-container">
    <button className="errorpage_button" onClick={goToHomePage}>Go Back to Home Page</button>
    <button className="errorpage_button" onClick={goBack}>Go Back to previous page</button>
    </div>
  </div>
  </div>
  )
}
