export const Bubble = () => {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
  }
  let posX = getRandomArbitrary(1, 1090)
  let size = getRandomArbitrary(40, 60)
  let speed = getRandomArbitrary(5000, 20000)
  return (
    <>
      <div
        className='bubble'
        style={{
          position: 'absolute',
          bottom: -size,
          left: posX,
          width: size + 'px',
          height: size + 'px',
          animation: 'goUp ' + speed + 'ms infinite '
        }}
        onAnimationEnd={(event) => {
          event.currentTarget.style.backgroundColor = 'black'
        }}
      ></div>
    </>
  )
}
