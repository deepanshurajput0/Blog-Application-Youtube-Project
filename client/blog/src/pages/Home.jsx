import homeImg from './../images/coding.jpg'
import Typewriter from 'typewriter-effect'
import BlogSec from './BlogSec'
const Home = () => {
  return (
    <div>
       <div className=" mt-20 font-poppins flex flex-col md:flex md:flex-row md:mt-40" >
       <div className=" space-y-7 p-10 md:w-[50%]" >
        <h1 className=" md:text-6xl text-5xl font-bold" >
        <Typewriter
  options={{
    strings: ["Create Your own Blogs"],
    autoStart: true,
    loop: true,
  }}
/>
 
        </h1>
        <p>
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero ipsa nobis officiis, rem consequuntur esse suscipit dolore, voluptatibus ad, dolorem labore distinctio accusamus! Possimus accusamus quod quae earum accusantium adipisci rem beatae minus, tenetur nam officiis et facere laborum assumenda, commodi nulla eos libero. Quis similique at ullam voluptatem quas?
        </p>
        <button className="bg-white text-black h-10 w-32 rounded-3xl font-semibold transition-transform duration-300 transform hover:scale-105"> 
          Get Started
        </button>
       </div>
       <div className=' ' >
        <img className=' w-[100%] md:h-[500px] h-72' src={homeImg} alt="" />
       </div>
    </div>
    <BlogSec/>
    
    </div>
  )
}

export default Home