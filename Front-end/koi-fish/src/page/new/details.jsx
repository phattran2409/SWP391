

export default function DetailsPage() {
    return (


        <div>
            {/* navbar */}
            <div className="border-b">
                <div className="container mx-auto px-4 py-6">
                    <nav className="flex justify-between items-center">
                        <a href="/" className="text-2xl font-bold">
                            NewsHub
                        </a>
                        <div className="flex space-x-4">
                            <a href="/latest" className="text-sm font-medium hover:underline">
                                Latest
                            </a>
                            <a href="/politics" className="text-sm font-medium hover:underline">
                                Politics
                            </a>
                            <a href="/technology" className="text-sm font-medium hover:underline">
                                Technology
                            </a>
                            <a href="/science" className="text-sm font-medium hover:underline">
                                Science
                            </a>
                        </div>
                    </nav>
                </div>
            </div>




            <div className="w-full bg-white border-b">
                <p className="text-sm text-gray-500 mb-4">Thứ tư, 9/10/2024, 00:02 (GMT+7)</p>
                <h1 className="text-3xl font-bold mb-4">Người TP HCM về tỉnh tìm mua nhà giá rẻ</h1>
                <p className="mb-4">Giá nhà tại TP HCM tăng cao khiến nhiều gia đình trẻ chọn về các tỉnh lân cận, tìm mua dự án chung cư có giá phù hợp túi tiền.</p>
                <p className="mb-4">Chị Nguyễn Lan Hương (34 tuổi, ngụ quận 8, TP HCM) vừa ký hợp đồng mua căn hộ 62 m2 giá 1,5 tỷ đồng (đã gồm VAT) tại Bến Lức, Long An. Trước khi đi đến quyết định trên, chị dành nhiều tháng tham khảo các dự án ở TP HCM và nhận thấy, với tài chính tầm hơn một tỷ đồng gần như không mua nổi nhà ở TP HCM, thậm chí là nhà ở xã hội cũng không có mức giá này.</p>


            </div>








            <div className="flex-grow">
            </div>

        </div>

    )
}
