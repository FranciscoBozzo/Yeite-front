const PlayButton = ({ playing, onClick }) => {

  const stopIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle opacity="0.3" cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
        <path d="M15 12L10 15L10 9L15 12Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }

  const playIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
        <path d="M9 9L15 9L15 15L9 15L9 9Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <div onClick={onClick} htmlFor="previewBtn" style={{ cursor: "pointer" }} className="d-flex justify-content-center align-items-center gap-2 text-white">
      {playing ? playIcon() : stopIcon()}
      <div style={{ fontSize: "13px", textTransform: "uppercase" }}>Previsualizar</div>
    </div>
  )
}

export default PlayButton;