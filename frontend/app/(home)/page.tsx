import Products from '@/components/Products'
import classes from './home.module.css'
import SmallAlerts from '@/components/SmallAlerts'
import SportDivisor from '@/components/SportDivisor'

export default async function Home() {
  return (
    <div className='flex flex-col pb-20'>
      {/* <SmallAlerts /> */}
      <div
        className={`bg-black p-4 min-h-[45rem] flex flex-col justify-center items-center ${classes.sale} max-[1150px]:h-[30rem] max-md:h-[800px] max-sm:h-[500px]`}
      ></div>
      <div className='mt-10'>
        <Products filters={{ line: 'Summer', take: 4 }} title='Summer line' />
        <Products filters={{ line: 'Casual', take: 4 }} title='Casual line' />
      </div>
      <div>
        <SportDivisor />
        <div
          className={`bg-black p-28 flex flex-col gap-20 ${classes.sport_area} h-[100vh]`}
        ></div>
        <SportDivisor />
      </div>
      <div className='mt-10'>
        <Products filters={{ line: 'NBA', take: 3 }} title='NBA line' />
        <Products filters={{ line: 'Soccer', take: 3 }} title='Soccer line' />
      </div>
    </div>
  )
  // return (
  //   <div>
  //     <p>{session?.user?.name}</p>
  //   </div>
  // )
}

// style={{ backgroundImage: "url('https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448749.jpg')", backgroundSize: 'cover'}}

{
  /* <Card img={[soccer, soccerHover]} alt='Soccer' />
          <Card
            img={[basketball, basketballHover]}
            alt='Basktball'
            className='lg:scale-110'
          />
          <Card img={[f1, f1Hover]} alt='f1' /> */
}
