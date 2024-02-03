import Link from "next/link";
export default function Home() {
  return (
    <div className='p-10 bg-[url("/images/auth-bg.png")] bg-cover flex flex-col gap-10 h-screen bg-[#171717] text-white'>
      <h1 className="text-xl text-center">
        Welcome to the Landing Page of HiBuddy
      </h1>
      <Link href="/auth" className="px-8 py-3 self-center bg-blue-500">
        Sign In
      </Link>
    </div>
  );
}
