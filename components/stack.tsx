interface StackProps{
    name: string
}

export default function Stack ({name}:StackProps){
    return(
        <div className="border px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md border-[#00C83D] text-[#00C83D] text-sm sm:text-base lg:text-lg hover:bg-[#00C83D] hover:text-black duration-200 transition-colors select-none">{name}</div>
    )
}