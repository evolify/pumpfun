import "./style.css"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loading-wave flex items-center justify-center">
        <div className="loading-item"></div>
        <div className="loading-item"></div>
        <div className="loading-item"></div>
        <div className="loading-item"></div>
        <div className="loading-item"></div>
        <div className="loading-item"></div>
        <div className="loading-item"></div>
        <div className="loading-item"></div>
      </div>
    </div>
  )
}
