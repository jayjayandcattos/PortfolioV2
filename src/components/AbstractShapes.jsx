function AbstractShapes() {
  return (
    <div className="fixed inset-0 w-full h-full z-[1] pointer-events-none overflow-hidden">
      <div className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-primary to-accent rounded-full blur-[100px] opacity-20 -top-[400px] -right-[400px] animate-floatShape"></div>
      <div className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-secondary to-primary rounded-full blur-[100px] opacity-20 -bottom-[350px] -left-[350px] animate-floatShape" style={{ animationDelay: '6s' }}></div>
      <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-accent to-secondary rounded-full blur-[100px] opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-floatShape" style={{ animationDelay: '12s' }}></div>
      <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-primary to-secondary rounded-full blur-[100px] opacity-20 top-[30%] right-[20%] animate-floatShape" style={{ animationDelay: '18s' }}></div>
    </div>
  )
}

export default AbstractShapes

