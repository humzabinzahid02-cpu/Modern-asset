import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollExpand from './ScrollExpand'
import StickyCard002 from './StickyCard002'
import GlassButton from '../GlassButton'
import { useLanguage } from '../LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export interface ProductDetail {
  id: string
  name: string
  tag: string
  category: string
  desc: string
  img: string
  specs: { label: string; value: string }[]
  features: string[]
  leadTime: string
}

const PRODUCTS_DATA: ProductDetail[] = [
  {
    id: "vacuum-jetting",
    name: "Vacuum & Jetting Trucks",
    tag: "Vacuum & Jetting",
    category: "municipal",
    desc: "Truck-mounted vacuum and high-pressure jetting vehicles for industrial cleaning and drainage work.",
    img: `${import.meta.env.BASE_URL}products/vacuum-jetting.jpg`,
    specs: [{"label":"Equipment","value":"Vacuum and jetting systems"},{"label":"Vehicle","value":"Truck-mounted unit"},{"label":"Applications","value":"Industrial cleaning and drainage"}],
    features: ["Vacuum collection equipment","High-pressure jetting equipment","Vehicle setup selected for the operation"],
    leadTime: 'On request',
  },
  {
    id: "sweepers",
    name: "Sweepers",
    tag: "Road Cleaning",
    category: "municipal",
    desc: "Road-sweeping vehicles for collecting debris and supporting street and site maintenance.",
    img: `${import.meta.env.BASE_URL}products/sweepers.jpg`,
    specs: [{"label":"Equipment","value":"Road sweeper"},{"label":"Operation","value":"Sweeping and debris collection"},{"label":"Applications","value":"Road and site maintenance"}],
    features: ["Road-sweeping equipment","Debris collection","Vehicle format selected for the route"],
    leadTime: 'On request',
  },
  {
    id: "aerial-platforms",
    name: "Aerial Platforms",
    tag: "Elevated Access",
    category: "custom",
    desc: "Truck-mounted aerial work platforms for maintenance and work at height.",
    img: `${import.meta.env.BASE_URL}products/aerial-platforms.jpg`,
    specs: [{"label":"Equipment","value":"Aerial work platform"},{"label":"Vehicle","value":"Truck-mounted platform"},{"label":"Applications","value":"Elevated maintenance work"}],
    features: ["Elevated work access","Truck-mounted equipment","Platform configuration selected for the task"],
    leadTime: 'On request',
  },
  {
    id: "cranes",
    name: "Cranes",
    tag: "Lifting Equipment",
    category: "custom",
    desc: "Truck-mounted cranes for lifting and handling materials at work sites.",
    img: `${import.meta.env.BASE_URL}products/cranes.jpg`,
    specs: [{"label":"Equipment","value":"Truck-mounted crane"},{"label":"Operation","value":"Material lifting and handling"},{"label":"Applications","value":"On-site and fleet operations"}],
    features: ["Crane mounted on a truck chassis","Lifting equipment for material handling","Setup selected for the operation"],
    leadTime: 'On request',
  },
  {
    id: "recovery-trucks",
    name: "Recovery Trucks",
    tag: "Vehicle Recovery",
    category: "municipal",
    desc: "Recovery vehicles for assisting and moving disabled commercial vehicles.",
    img: `${import.meta.env.BASE_URL}products/recovery-trucks.jpg`,
    specs: [{"label":"Vehicle","value":"Recovery truck"},{"label":"Operation","value":"Roadside vehicle recovery"},{"label":"Applications","value":"Commercial vehicles"}],
    features: ["Vehicle recovery equipment","Roadside assistance use","Configuration selected for recovery needs"],
    leadTime: 'On request',
  },
  {
    id: "flatbed-trailers",
    name: "Flat-Bed Trailers",
    tag: "Freight Trailers",
    category: "heavy",
    desc: "Flat-deck trailers for transporting freight, equipment, and general cargo.",
    img: `${import.meta.env.BASE_URL}products/flatbed-trailers.jpg`,
    specs: [{"label":"Trailer","value":"Flat-bed platform"},{"label":"Cargo","value":"Freight and equipment"},{"label":"Configuration","value":"Selected for the transported load"}],
    features: ["Open flat-bed deck","General cargo transport","Trailer configuration selected per load"],
    leadTime: 'On request',
  },
  {
    id: "lowbed-trailers",
    name: "Low-Bed Trailers",
    tag: "Heavy Haul",
    category: "heavy",
    desc: "Low-bed trailers for hauling heavy machinery and equipment.",
    img: `${import.meta.env.BASE_URL}products/lowbed-trailers.jpg`,
    specs: [{"label":"Trailer","value":"Low-bed platform"},{"label":"Cargo","value":"Heavy machinery and equipment"},{"label":"Configuration","value":"Selected for the transported load"}],
    features: ["Low loading deck","Heavy equipment transport","Trailer setup selected for the cargo"],
    leadTime: 'On request',
  },
  {
    id: "car-carrier-trailers",
    name: "Car Carrier Trailers",
    tag: "Vehicle Transport",
    category: "heavy",
    desc: "Purpose-built trailers for transporting passenger vehicles between locations.",
    img: `${import.meta.env.BASE_URL}products/car-carrier-trailers.jpg`,
    specs: [{"label":"Trailer","value":"Car carrier"},{"label":"Cargo","value":"Passenger vehicles"},{"label":"Configuration","value":"Vehicle transport layout"}],
    features: ["Vehicle transport trailer","Multi-vehicle layout options","Configuration selected for the fleet"],
    leadTime: 'On request',
  },
  {
    id: "cargo-trucks",
    name: "Cargo Trucks",
    tag: "Cargo Transport",
    category: "transport",
    desc: "Cargo trucks for moving general goods, freight, and deliveries.",
    img: `${import.meta.env.BASE_URL}products/cargo-trucks.jpg`,
    specs: [{"label":"Vehicle","value":"Cargo truck"},{"label":"Cargo","value":"General goods and freight"},{"label":"Body","value":"Selected for the load and route"}],
    features: ["Cargo-focused truck body","Freight and delivery use","Body configuration selected per operation"],
    leadTime: 'On request',
  },
  {
    id: "dump-trucks",
    name: "Dump Trucks",
    tag: "Bulk Material",
    category: "transport",
    desc: "Tipper trucks for transporting and unloading bulk materials at work sites.",
    img: `${import.meta.env.BASE_URL}products/dump-trucks.jpg`,
    specs: [{"label":"Vehicle","value":"Dump truck"},{"label":"Body","value":"Tipping cargo body"},{"label":"Cargo","value":"Bulk materials"}],
    features: ["Tipping body for unloading","Bulk material transport","Configuration selected for the job"],
    leadTime: 'On request',
  },
  {
    id: "wrecker-trucks",
    name: "Wrecker Trucks",
    tag: "Heavy Recovery",
    category: "municipal",
    desc: "Wrecker trucks for towing and recovering disabled vehicles from roads and work sites.",
    img: `${import.meta.env.BASE_URL}products/wrecker-trucks.jpg`,
    specs: [{"label":"Vehicle","value":"Wrecker truck"},{"label":"Operation","value":"Towing and recovery"},{"label":"Applications","value":"Roadside and site assistance"}],
    features: ["Vehicle towing equipment","Recovery of disabled vehicles","Configuration selected for recovery work"],
    leadTime: 'On request',
  },
  {
    id: "car-carrier-trucks",
    name: "Car Carrier Trucks",
    tag: "Vehicle Transport",
    category: "transport",
    desc: "Car-carrier trucks for moving passenger vehicles as part of vehicle logistics operations.",
    img: `${import.meta.env.BASE_URL}products/car-carrier-trucks.jpg`,
    specs: [{"label":"Vehicle","value":"Car carrier truck"},{"label":"Cargo","value":"Passenger vehicles"},{"label":"Operation","value":"Vehicle logistics"}],
    features: ["Truck-mounted car transport body","Vehicle loading and transport","Configuration selected for the fleet"],
    leadTime: 'On request',
  },
  {
    id: "waste-containers",
    name: "Heavy Waste Containers",
    tag: "Waste Handling",
    category: "municipal",
    desc: "Heavy-duty containers for collecting and moving waste at municipal, construction, and industrial sites.",
    img: `${import.meta.env.BASE_URL}products/waste-containers.jpg`,
    specs: [{"label":"Product","value":"Heavy waste container"},{"label":"Operation","value":"Waste collection and transfer"},{"label":"Applications","value":"Municipal and industrial sites"}],
    features: ["Heavy-duty container format","Waste collection and transfer","Container setup selected for the handling system"],
    leadTime: 'On request',
  }
]

const SPEC_LABEL_AR: Record<string, string> = {
  Equipment: 'المعدة',
  Vehicle: 'المركبة',
  Operation: 'نوع العملية',
  Applications: 'مجالات الاستخدام',
  Trailer: 'المقطورة',
  Cargo: 'نوع الحمولة',
  Body: 'الهيكل',
  Configuration: 'التهيئة والتجهيز',
  Product: 'المنتج',
}

const PRODUCTS_AR: Record<string, Partial<ProductDetail>> = {
  "vacuum-jetting": {
    name: "شاحنات الشفط والنفث",
    tag: "الشفط والنفث",
    desc: "شاحنات مجهزة بأنظمة الشفط والنفث عالي الضغط لأعمال التنظيف الصناعي وصيانة شبكات التصريف.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المعدة", value: "أنظمة الشفط والنفث عالي الضغط" },
      { label: "المركبة", value: "وحدة متكاملة مركبة على شاحنة" },
      { label: "مجالات الاستخدام", value: "التنظيف الصناعي وشبكات التصريف" }
    ],
    features: [
      "معدات شفط متطورة بقدرات سحب وتفريغ عالية",
      "مضخات نفث عالي الضغط لتسليك وتنظيف الأنابيب",
      "تهيئة الشاسيه والمواصفات حسب متطلبات التشغيل"
    ]
  },
  "sweepers": {
    name: "مكنسات الطرق",
    tag: "تنظيف الطرق",
    desc: "مركبات كنس لجمع المخلفات ودعم صيانة الطرق والمواقع.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المعدة", value: "مكنسة طرق متطورة" },
      { label: "نوع العملية", value: "كنس وجمع المخلفات والأتربة" },
      { label: "مجالات الاستخدام", value: "صيانة الطرق والشوارع والمواقع" }
    ],
    features: [
      "معدات كنس وفرش هيدروليكية عالية الكفاءة",
      "نظام شفط وتجميع المخلفات مع خزان مياه للترطيب",
      "تصميم وهيكل مخصص لطبيعة المسارات التشغيلية"
    ]
  },
  "aerial-platforms": {
    name: "منصات العمل الجوية",
    tag: "الوصول إلى المرتفعات",
    desc: "منصات عمل جوية مركبة على شاحنات لأعمال الصيانة والعمل على ارتفاعات.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المعدة", value: "منصة عمل جوية معزولة" },
      { label: "المركبة", value: "رافعة هيدروليكية على شاحنة" },
      { label: "مجالات الاستخدام", value: "أعمال الصيانة والرفع على ارتفاعات" }
    ],
    features: [
      "وصول آمن للمرتفعات مع سلة عمل معزولة ومحمية",
      "أنظمة أمان وتحكم هيدروليكي دقيق وثنائي الاتجاه",
      "دعامات أرضية هيدروليكية لتحقيق أعلى درجات الاستقرار"
    ]
  },
  "cranes": {
    name: "الرافعات",
    tag: "معدات الرفع",
    desc: "رافعات مركبة على الشاحنات لرفع المواد ومناولتها في مواقع العمل.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المعدة", value: "رافعة هيدروليكية على الشاحنة" },
      { label: "نوع العملية", value: "رفع ومناولة ونقل الحمولات" },
      { label: "مجالات الاستخدام", value: "المشاريع الإنشائية وعمليات الأساطيل" }
    ],
    features: [
      "رافعة مدمجة على شاسيه الشاحنة بقدرات حمولة متعددة",
      "ذراع تلسكوبي ممتد مع تحكم لاسلكي عن بعد",
      "دعامات تثبيت هيدروليكية لضمان السلامة الميدانية"
    ]
  },
  "recovery-trucks": {
    name: "شاحنات الاستعادة",
    tag: "استعادة المركبات",
    desc: "مركبات لمساعدة الطريق ونقل المركبات التجارية المتعطلة.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المركبة", value: "شاحنة استعادة وسحب مركبات" },
      { label: "نوع العملية", value: "استعادة وسحب المركبات على الطرق" },
      { label: "مجالات الاستخدام", value: "المركبات التجارية والشاحنات" }
    ],
    features: [
      "ونش سحب هيدروليكي ثقيل مع ذراع رفع سفلي",
      "خدمات الإنقاذ السريع ومساعدة الطريق على مدار الساعة",
      "هيكل فولاذي مدعم للأوزان والحمولات الثقيلة"
    ]
  },
  "flatbed-trailers": {
    name: "مقطورات مسطحة",
    tag: "مقطورات البضائع",
    desc: "مقطورات بمنصة مسطحة لنقل البضائع والمعدات والحمولات العامة.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المقطورة", value: "سطحة مسطحة متعددة المحاور" },
      { label: "نوع الحمولة", value: "البضائع والمعدات والحاويات العامة" },
      { label: "التهيئة والتجهيز", value: "تصميم مخصص حسب وزن ونوع الحمولة" }
    ],
    features: [
      "أرضية شحن مفتوحة من الفولاذ أو الخشب المعالج",
      "نقاط تثبيت وسلاسل مطابقة للمواصفات القياسية",
      "محاور وأنظمة تعليق متينة للطرق الوعرة والسريعة"
    ]
  },
  "lowbed-trailers": {
    name: "مقطورات منخفضة",
    tag: "النقل الثقيل",
    desc: "مقطورات منخفضة لنقل الآليات والمعدات الثقيلة.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المقطورة", value: "مقطورة لوبد منخفضة التحميل" },
      { label: "نوع الحمولة", value: "المعدات الإنشائية والآليات الثقيلة" },
      { label: "التهيئة والتجهيز", value: "محاور متعددة مع منحدرات هيدروليكية" }
    ],
    features: [
      "ارتفاع تحميل منخفض لتسهيل صعود الآليات الثقيلة بأمان",
      "منحدرات صعود خلفية هيدروليكية شديدة التحمل",
      "فولاذ عالي المقاومة ومحاور متطورة للأوزان الفائقة"
    ]
  },
  "car-carrier-trailers": {
    name: "مقطورات نقل السيارات",
    tag: "نقل المركبات",
    desc: "مقطورات مخصصة لنقل سيارات الركاب بين المواقع.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المقطورة", value: "مقطورة نقل سيارات متعددة الطوابق" },
      { label: "نوع الحمولة", value: "سيارات الركاب والمركبات الخفيفة" },
      { label: "التهيئة والتجهيز", value: "نظام تحميل ثنائي الطوابق" }
    ],
    features: [
      "منصات تحميل هيدروليكية قابلة للتعديل والرفع",
      "أنظمة قفل وتثبيت للعجلات لضمان السلامة الكاملة",
      "سعة استيعابية مصممة لخفض تكاليف النقل اللوجستي"
    ]
  },
  "cargo-trucks": {
    name: "شاحنات نقل البضائع",
    tag: "نقل البضائع",
    desc: "شاحنات لنقل البضائع العامة والحمولات وطلبات التوصيل.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المركبة", value: "شاحنة نقل بضائع" },
      { label: "نوع الحمولة", value: "البضائع العامة والشحنات التجارية" },
      { label: "الهيكل", value: "صندوق شاحنة مصمم حسب المسار والحمولة" }
    ],
    features: [
      "صندوق شاحنة معزول أو مفتوح بأبواب وجدران متعددة",
      "تصميم هندسي متوازن لتقليل استهلاك الوقود",
      "هيكل عالي الصلابة ملائم لظروف المناخ بالمملكة"
    ]
  },
  "dump-trucks": {
    name: "شاحنات قلاب",
    tag: "نقل المواد السائبة",
    desc: "شاحنات قلاب لنقل المواد السائبة وتفريغها في مواقع العمل.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المركبة", value: "شاحنة قلاب لنقل المواد" },
      { label: "الهيكل", value: "صندوق تفريغ هيدروليكي قلاب" },
      { label: "نوع الحمولة", value: "المواد السائبة والرمل والحصى" }
    ],
    features: [
      "أسطوانة هيدروليكية تلسكوبية أمامية لرفع سلس وسريع",
      "فولاذ صلب مقاوم للاحتكاك والصدمات في بيئات العمل الشاقة",
      "بوابة خلفية بنظام فتح تلقائي عند التفريغ"
    ]
  },
  "wrecker-trucks": {
    name: "شاحنات سحب وإنقاذ",
    tag: "الإنقاذ الثقيل",
    desc: "شاحنات لسحب واستعادة المركبات المتعطلة من الطرق ومواقع العمل.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المركبة", value: "شاحنة سحب وإنقاذ ثقيل (ريكفري)" },
      { label: "نوع العملية", value: "سحب وإنقاذ الآليات والمركبات المتعطلة" },
      { label: "مجالات الاستخدام", value: "مساعدة الطريق ومواقع المشاريع الكبرى" }
    ],
    features: [
      "ذراع رفع دوّار ومزدوج بقدرات سحب هائلة",
      "أنظمة تحكم هيدروليكية متطورة بكابلات فائقة المتانة",
      "أرجل تثبيت هيدروليكية لضمان الاستقرار أثناء عمليات السحب"
    ]
  },
  "car-carrier-trucks": {
    name: "شاحنات ناقلة للسيارات",
    tag: "نقل المركبات",
    desc: "شاحنات لنقل سيارات الركاب ضمن عمليات لوجستية للمركبات.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المركبة", value: "شاحنة ناقلة سيارات مدمجة" },
      { label: "نوع الحمولة", value: "سيارات الركاب والمركبات الخفيفة" },
      { label: "نوع العملية", value: "اللوجستيات ونقل وتوزيع السيارات" }
    ],
    features: [
      "هيكل هيدروليكي مدمج مركب مباشرة على الشاسيه",
      "منحدرات صعود سلسة لتحميل آمن وسريع للمركبات",
      "مرونة عالية في الحركة والمناورة داخل المدن والموانئ"
    ]
  },
  "waste-containers": {
    name: "حاويات نفايات ثقيلة",
    tag: "إدارة النفايات",
    desc: "حاويات قوية لجمع النفايات ونقلها في المواقع البلدية والإنشائية والصناعية.",
    leadTime: 'حسب الطلب',
    specs: [
      { label: "المنتج", value: "حاوية نفايات ومخلفات صناعية ثقيلة" },
      { label: "نوع العملية", value: "تجميع ونقل المخلفات والنفايات" },
      { label: "مجالات الاستخدام", value: "المواقع البلدية والإنشائية والصناعية" }
    ],
    features: [
      "هيكل فولاذي ملحوم بالكامل لتحمل أقصى درجات الضغط",
      "متوافقة مع شاحنات الرفع والسكيب وهوكلفت القياسية",
      "معالجة حرارية وطلاء مقاوم للصدأ والعوامل الجوية"
    ]
  }
}

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'transport', label: 'Trucks & Freight' },
  { id: 'heavy', label: 'Trailers' },
  { id: 'municipal', label: 'Municipal & Recovery' },
  { id: 'custom', label: 'Lifting & Access' },
]
const AR_CATEGORIES = ['كل المنتجات', 'الشاحنات ونقل البضائع', 'المقطورات', 'الخدمات البلدية والإنقاذ', 'الرفع والوصول']


export default function Products() {
  const { isArabic } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack')
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredProducts = PRODUCTS_DATA.filter((p) =>
    activeCategory === 'all' ? true : p.category === activeCategory
  ).map((product) => isArabic ? { ...product, ...PRODUCTS_AR[product.id] } : product)
  const gridCardsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (viewMode !== 'grid') return
    const el = gridCardsRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.grid-product-card')
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [viewMode, activeCategory])

  return (
    <section id="products" className="bg-[#F6F5F1] relative w-full overflow-x-clip">
      {/* ScrollExpand Section */}
      <div className="relative w-full mb-4 sm:mb-8">
        <ScrollExpand
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1280&h=720&fit=crop&auto=format"
          alt={isArabic ? 'توسّع أسطول مودرن أسيتس' : 'Modern Assets Heavy Fleet Expansion'}
          title={isArabic ? 'حلول لكل القطاعات' : 'BUILT FOR EVERY INDUSTRY'}
          badge={isArabic ? 'الفصل 02 • الأساطيل التجارية' : 'CHAPTER 02 • COMMERCIAL FLEET'}
          scrollHint={isArabic ? 'مرّر لتوسيع عرض الأسطول' : 'SCROLL TO EXPAND FLEET'}
          startWidth={76}
          startHeight={78}
          startRadius={24}
          endRadius={0}
          mediaZoom={1.25}
          scrollDistance={0.9}
          holdDistance={0.15}
          smoothing={0.03}
          overlayScrim={0.5}
          useWindowScroll={true}
        >
          {/* Content that fades in over the media once it reaches full bleed */}
          <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E07B10]/20 border border-[#E07B10]/40 backdrop-blur-md font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E07B10] mb-4">
              <span>{isArabic ? 'الفصل 02' : 'CHAPTER 02'}</span>
              <span className="opacity-40">•</span>
              <span>{isArabic ? 'أساطيل تجارية للمركبات الثقيلة' : 'HEAVY-DUTY COMMERCIAL FLEET'}</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.95] mb-4 text-white drop-shadow-md">
              {isArabic ? 'مصممة ' : 'ENGINEERED FOR '}<span className="text-[#E07B10]">{isArabic ? 'للحمولات الفائقة' : 'EXTREME PAYLOADS'}</span>
            </h2>

            <p className="font-body text-xs sm:text-base md:text-lg font-light leading-relaxed text-white/90 max-w-xl mb-6 drop-shadow-sm">
              {isArabic
                ? 'من صهاريج المواد الكيميائية المعتمدة وفق ADR إلى المقطورات الهيدروليكية منخفضة السطح بقدرة 150 طناً، نصنع حلولاً تجارية ثقيلة لأداء موثوق ومتانة عالية.'
                : 'From certified ADR chemical tankers to 150-ton hydraulic low-bed trailers, our heavy commercial solutions are forged for unyielding performance and absolute durability.'}
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <GlassButton
                variant="gold"
                size="md"
                onClick={() => {
                  const target = document.getElementById('catalog-cards')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span className="inline-flex items-center gap-1.5">{isArabic ? 'تصفّح كتالوج الأسطول' : 'Inspect Fleet Catalog'} <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg></span>
              </GlassButton>
              <GlassButton
                variant="ghost-white"
                size="md"
                onClick={() => {
                  const target = document.getElementById('contact')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span className="inline-flex items-center gap-1.5">{isArabic ? 'اطلب تصميماً مخصصاً' : 'Request Custom Blueprint'} <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></span>
              </GlassButton>
            </div>
          </div>
        </ScrollExpand>
      </div>

      {/* Product Catalog Grid Container */}
      <div id="catalog-cards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col gap-6 mb-8 sm:mb-12">
          <div className="flex flex-col items-stretch gap-6">
            <div>
              <div className="font-body text-[11px] tracking-[0.3em] uppercase text-[#E07B10] mb-2 font-bold">
                {isArabic ? 'كتالوج الأسطول الدقيق' : 'Precision Fleet Catalog'}
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-none text-[#1B2B3A]">
                {isArabic ? 'حلول تناسب كل قطاع' : 'Tailored for Every Sector'}
              </h3>
            </div>

            {/* Filter Pills & View Switcher strictly in one horizontal line */}
            <div className="flex w-full flex-nowrap items-center justify-between gap-3 max-w-full pb-1 sm:pb-0">
              {/* Category filters — Single Line */}
              <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-1 sm:gap-1.5 bg-white p-1 sm:p-1.5 rounded-2xl border border-[#E2DFDC] shadow-xs max-w-full overflow-x-auto xl:overflow-visible no-scrollbar whitespace-nowrap">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`shrink-0 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-display text-[11px] sm:text-xs font-bold tracking-wider uppercase cursor-pointer border-none transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-[#E07B10] text-white shadow-xs'
                          : 'bg-transparent text-[#5C6470] hover:text-[#1B2B3A]'
                      }`}
                    >
                      {isArabic ? AR_CATEGORIES[CATEGORIES.findIndex((category) => category.id === cat.id)] : cat.label}
                    </button>
                  )
                })}
              </div>

              {/* View Switcher: 3D ScrollStack vs 2-Column Grid */}
              <div className="flex shrink-0 items-center gap-1 bg-white p-1 sm:p-1.5 rounded-2xl border border-[#E2DFDC] shadow-xs">
                <button
                  onClick={() => setViewMode('stack')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-display text-[11px] sm:text-xs font-bold tracking-wider uppercase cursor-pointer border-none transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    viewMode === 'stack'
                      ? 'bg-[#E07B10] text-white shadow-xs'
                      : 'bg-transparent text-[#5C6470] hover:text-[#1B2B3A]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                  <span>{isArabic ? 'تكديس' : 'Stack'}</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-display text-[11px] sm:text-xs font-bold tracking-wider uppercase cursor-pointer border-none transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    viewMode === 'grid'
                      ? 'bg-[#E07B10] text-white shadow-xs'
                      : 'bg-transparent text-[#5C6470] hover:text-[#1B2B3A]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                  <span>{isArabic ? 'شبكة' : 'Grid'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode: Responsive Stack or 2-Column Grid */}
        {viewMode === 'stack' ? (
          <div className="relative w-full max-w-7xl mx-auto">
            <StickyCard002
              cards={filteredProducts}
              containerClassName="max-w-6xl xl:max-w-[1340px]"
              renderCard={(p) => (
                <div
                  onClick={() => setSelectedProduct(p)}
                  className="stack-card-inner group grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[540px] cursor-pointer bg-white rounded-2xl sm:rounded-3xl lg:rounded-[34px] overflow-hidden border border-[#E2DFDC] shadow-xs hover:shadow-md transition-all"
                >
                  {/* Vehicle Image (Top on mobile, Left 7-cols on desktop) */}
                  <div className="relative lg:col-span-7 overflow-hidden h-56 sm:h-72 lg:h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] bg-[#F6F5F1]">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3A]/40 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 font-body text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white bg-[#E07B10] px-3 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>{p.tag}</span>
                    </div>

                    {/* Expand Cue */}
                    <div className="absolute top-4 right-4 font-body text-[10px] sm:text-xs tracking-wider uppercase text-[#1B2B3A] bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md border border-[#E2DFDC] font-semibold">
                      {isArabic ? 'عرض المواصفات ↗' : 'Inspect Specs ↗'}
                    </div>
                  </div>

                  {/* Detailed Specs & Controls (Bottom on mobile, Right 5-cols on desktop) */}
                  <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 xl:p-10 flex flex-col justify-center bg-white">
                    <div className="font-body text-[10px] sm:text-xs tracking-widest uppercase text-[#E07B10] font-bold mb-1.5">
                      {isArabic ? 'مدة التصنيع: ' : 'Build Lead Time: '}{p.leadTime}
                    </div>
                    <h4 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase text-[#1B2B3A] mb-2 sm:mb-3 leading-tight">
                      {p.name}
                    </h4>
                    <p className="font-body text-xs sm:text-sm text-[#5C6470] leading-relaxed mb-4 sm:mb-6 line-clamp-3 lg:line-clamp-none">
                      {p.desc}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-[#F6F5F1] border border-[#E2DFDC] mb-5 sm:mb-6">
                      {p.specs.map((s, idx) => (
                        <div key={idx}>
                          <div className="font-body text-[10px] sm:text-[11px] tracking-wider uppercase text-[#5C6470] mb-0.5 font-semibold">
                            {isArabic ? (SPEC_LABEL_AR[s.label] || s.label) : s.label}
                          </div>
                          <div className="font-display font-extrabold text-sm sm:text-base lg:text-lg text-[#1B2B3A] leading-tight">
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                      <GlassButton
                        variant="gold"
                        size="md"
                        style={{ flex: 1, justifyContent: 'center' }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          setSelectedProduct(p)
                        }}
                      >
                        <span className="inline-flex items-center gap-1.5">{isArabic ? 'عرض المواصفات' : 'Inspect Specs'} <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></span>
                      </GlassButton>
                      <GlassButton
                        variant="ghost"
                        size="md"
                        style={{ flex: 1, justifyContent: 'center' }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          const contactEl = document.getElementById('contact')
                          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        {isArabic ? 'اطلب عرض سعر' : 'Inquire Quote'}
                      </GlassButton>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        ) : (
          /* Product Cards Grid: 1 Col on Mobile, 2 Col on Tablet/Desktop */
          <div
            ref={gridCardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto w-full"
          >
            {filteredProducts.map((p) => {
              const isHovered = hoveredId === p.id
              return (
                <div
                  key={p.id}
                  className="grid-product-card bg-white rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border border-[#E2DFDC] hover:border-[#E07B10] shadow-xs hover:shadow-lg transition-all flex flex-col"
                  onClick={() => setSelectedProduct(p)}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Visual Image Banner */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] min-h-[200px] overflow-hidden bg-[#F6F5F1]">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                        isHovered ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3A]/60 via-transparent to-transparent pointer-events-none" />

                    {/* Category Badge */}
                    <div className="absolute top-3.5 left-3.5 font-body text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white bg-[#E07B10] px-2.5 py-1 rounded-md shadow-xs">
                      {p.tag}
                    </div>

                    {/* Lead Time indicator */}
                    <div className="absolute top-3.5 right-3.5 font-body text-[10px] sm:text-xs tracking-wider uppercase text-[#1B2B3A] bg-white px-2.5 py-1 rounded-md border border-[#E2DFDC] font-semibold">
                      {isArabic ? 'التصنيع: ' : 'Build: '}{p.leadTime}
                    </div>

                    {/* Name overlay */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5">
                      <h4 className="font-display font-black text-xl sm:text-2xl lg:text-3xl uppercase text-white drop-shadow-md m-0">
                        {p.name}
                      </h4>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
                    <p className="font-body text-xs sm:text-sm text-[#5C6470] leading-relaxed mb-4 line-clamp-2">
                      {p.desc}
                    </p>

                    {/* Technical Specs 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#F6F5F1] border border-[#E2DFDC] mb-5">
                      {p.specs.map((s, sIdx) => (
                        <div key={sIdx}>
                          <div className="font-body text-[10px] tracking-wider uppercase text-[#5C6470] mb-0.5">
                            {isArabic ? (SPEC_LABEL_AR[s.label] || s.label) : s.label}
                          </div>
                          <div className="font-display font-bold text-sm sm:text-base text-[#1B2B3A]">
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex gap-2.5 mt-auto">
                      <GlassButton
                        variant="gold"
                        size="sm"
                        style={{ flex: 1, justifyContent: 'center' }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          setSelectedProduct(p)
                        }}
                      >
                        <span className="inline-flex items-center gap-1.5">{isArabic ? 'عرض المواصفات' : 'Inspect Specs'} <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></span>
                      </GlassButton>
                      <GlassButton
                        variant="ghost"
                        size="sm"
                        style={{ flex: 1, justifyContent: 'center' }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          const contactEl = document.getElementById('contact')
                          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        {isArabic ? 'اطلب عرض سعر' : 'Inquire Quote'}
                      </GlassButton>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Interactive Vehicle Inspection Modal */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 z-[99999] bg-[#1B2B3A]/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white border border-[#E2DFDC] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col"
          >
            {/* Modal Header Image */}
            <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3A]/80 via-[#1B2B3A]/20 to-transparent" />
              
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white hover:bg-[#E07B10] text-[#1B2B3A] hover:text-white border border-[#E2DFDC] flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                aria-label={isArabic ? 'إغلاق النافذة' : 'Close modal'}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Header Title */}
              <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6">
                <span className="inline-block font-body text-[10px] tracking-wider uppercase text-white bg-[#E07B10] px-3 py-1 rounded-md mb-1.5 font-bold">
                  {selectedProduct.tag}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-4xl uppercase text-white m-0 leading-tight">
                  {selectedProduct.name}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 md:p-8 bg-white flex flex-col">
              <p className="font-body text-xs sm:text-sm text-[#5C6470] leading-relaxed mb-6">
                {selectedProduct.desc}
              </p>

              {/* Specs Grid */}
              <h5 className="font-display font-extrabold text-base sm:text-lg tracking-wider uppercase text-[#1B2B3A] mb-3">
                {isArabic ? 'المواصفات والحدود الفنية' : 'Technical Specifications & Limits'}
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
                {selectedProduct.specs.map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F6F5F1] border border-[#E2DFDC] rounded-xl p-3"
                  >
                    <div className="font-body text-[10px] tracking-wider uppercase text-[#5C6470]">
                      {isArabic ? (SPEC_LABEL_AR[s.label] || s.label) : s.label}
                    </div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-[#1B2B3A] mt-1">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Engineering Features */}
              <h5 className="font-display font-extrabold text-base sm:text-lg tracking-wider uppercase text-[#1B2B3A] mb-3">
                {isArabic ? 'أبرز المزايا الهندسية' : 'Key Engineering Highlights'}
              </h5>
              <ul className="list-none p-0 m-0 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProduct.features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center gap-2.5 font-body text-xs sm:text-sm text-[#5C6470]"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#E07B10]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#E07B10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E2DFDC] pt-5 mt-auto">
                <div className="font-body text-xs text-[#5C6470] text-center sm:text-left">
                  {isArabic ? 'هندسة وأبعاد مخصصة حسب الطلب في المملكة.' : 'Custom engineering and dimensions built to order in KSA.'}
                </div>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <GlassButton
                    variant="gold"
                    size="md"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => {
                      setSelectedProduct(null)
                      const c = document.getElementById('contact')
                      if (c) c.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5">{isArabic ? 'اطلب تصميماً' : 'Inquire Blueprint'} <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></span>
                  </GlassButton>
                  <GlassButton
                    variant="ghost"
                    size="md"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => setSelectedProduct(null)}
                  >
                    {isArabic ? 'إغلاق' : 'Close'}
                  </GlassButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
