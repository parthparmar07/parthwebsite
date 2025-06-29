"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  Moon,
  Sun,
  Download,
  Mail,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Code,
  Brain,
  Rocket,
  Award,
  Users,
  MapPin,
  Calendar,
  Star,
  Zap,
  Target,
  TrendingUp,
  Database,
  Globe,
  Shield,
  Cpu,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Floating particles component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    // Only access window object after component mount (client-side)
    const newParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
    }))
    setParticles(newParticles)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 dark:bg-blue-300/10 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Animated counter component
const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  const { toast } = useToast()

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    // Simulate email sending
    console.log("Contact form submitted:", data)
    toast({
      title: "Message Sent Successfully! 🚀",
      description: "Thank you for reaching out. Parth will get back to you soon!",
    })

    // Reset form
    e.currentTarget.reset()
  }

  const handleResumeClick = () => {
    toast({
      title: "Contact Parth for Resume 📄",
      description: "For fast replies, connect on LinkedIn! Feel free to reach out anytime.",
    })
  }

  const projects = [
    {
      title: "SkillSync - AI Career Development Platform",
      description:
        "An AI-powered career development platform that's changing how students and professionals optimize their careers for today's competitive job market",
      tech: ["Python", "AI/ML", "React", "Django", "NLP"],
      icon: <Brain className="h-6 w-6" />,
      gradient: "from-indigo-400 to-purple-600",
      image: "/skillsync-platform.jpg",
    },
    {
      title: "Stock Market Prediction & Analysis",
      description:
        "AI-powered stock market analysis using advanced machine learning algorithms and real-time data processing",
      tech: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: "from-green-400 to-emerald-600",
      image: "/stock-market-chart.jpg",
    },
    {
      title: "University Workflow Manager",
      description: "Comprehensive workflow management system streamlining university operations and student services",
      tech: ["Django", "Python", "PostgreSQL", "React"],
      icon: <Target className="h-6 w-6" />,
      gradient: "from-blue-400 to-cyan-600",
      image: "/university-workflow.jpg",
    },
    {
      title: "Excel File Unlocker",
      description: "Advanced security tool for unlocking password-protected Excel files with ethical usage guidelines",
      tech: ["Python", "Cryptography", "Security"],
      icon: <Shield className="h-6 w-6" />,
      gradient: "from-orange-400 to-red-600",
      image: "/excel-security.jpg",
    },
    {
      title: "Time Series Forecasting Model",
      description: "Sophisticated forecasting model utilizing LSTM networks for accurate time series predictions",
      tech: ["Python", "LSTM", "TensorFlow", "Statistics"],
      icon: <Cpu className="h-6 w-6" />,
      gradient: "from-purple-400 to-pink-600",
      image: "/time-series-forecast.jpg",
    },
    {
      title: "Green Building Adoption Rate Model",
      description: "Predictive analytics model for sustainable building adoption rates using environmental data",
      tech: ["Python", "ML", "Environmental Data", "Visualization"],
      icon: <Globe className="h-6 w-6" />,
      gradient: "from-green-400 to-teal-600",
      image: "/green-building.jpg",
    },
  ]

  const experiences = [
    {
      title: "Data Science Intern",
      company: "Oasis Infobyte",
      period: "May 2025 - June 2025",
      type: "Internship",
      icon: <Database className="h-5 w-5" />,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Machine Learning Intern",
      company: "Cognifyz Technologies",
      period: "Apr 2025 - May 2025",
      type: "Internship",
      icon: <Brain className="h-5 w-5" />,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Software Testing Intern",
      company: "Pocket Films (OTT App)",
      period: "Aug 2024 - Nov 2024",
      type: "Internship",
      icon: <Shield className="h-5 w-5" />,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Intern",
      company: "Agnirva Space",
      period: "Nov 2024 - Jan 2025",
      type: "Internship",
      icon: <Rocket className="h-5 w-5" />,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Tech Team Lead",
      company: "Vocacity",
      period: "Mar 2025 - Present",
      type: "Startup",
      description:
        "Leading the development of AI-powered voice agents for interactive customer engagement and voice-based automation.",
      icon: <Zap className="h-5 w-5" />,
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "AI ML Engineer",
      company: "Datalis",
      period: "Apr 2025 - Present",
      type: "Startup",
      description:
        "Building AI-powered finance analysis agents that automate financial insights, detect trends, and support intelligent decision-making.",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-indigo-600 dark:text-indigo-400",
    },
  ]

  const skills = {
    languages: ["Python", "Java", "MySQL", "HTML", "CSS"],
    frameworks: ["Django", "Flask", "TensorFlow", "Scikit-learn"],
    tools: ["Kali Linux", "Git", "Docker", "AWS", "Project Management"],
  }

  const stats = [
    { label: "Projects Completed", value: 15, suffix: "+" },
    { label: "Technologies Mastered", value: 20, suffix: "+" },
    { label: "Certifications", value: 8, suffix: "" },
    { label: "Years of Experience", value: 2, suffix: "+" },
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900 min-h-screen">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed top-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold">
              <motion.span
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 100%" }}
              >
                Parth Parmar
              </motion.span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  <a href="#contact">Get In Touch</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <FloatingParticles />

          <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-800/20" />
          </motion.div>

          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 3 }}
              className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 dark:from-blue-600/10 dark:to-cyan-600/10 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 3, delay: 1 }}
              className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 dark:from-purple-600/10 dark:to-pink-600/10 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 3, delay: 2 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-400/20 to-blue-400/20 dark:from-indigo-600/10 dark:to-blue-600/10 blur-3xl"
            />
          </div>

          <motion.div style={{ y: textY }} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Parth
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  Parmar
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 font-light"
              >
                AI & ML Engineer • Full-Stack Developer • Innovation Leader
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              >
                Passionate about creating intelligent solutions that bridge the gap between cutting-edge AI technology
                and real-world applications. Specializing in machine learning, data science, and full-stack development.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <a href="#projects" className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Explore Projects
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleResumeClick}
                className="text-lg px-8 py-4 border-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex justify-center gap-8"
            >
              <motion.a
                href="mailto:parthparmar4015@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Mail className="h-8 w-8" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/parthparmar04"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Linkedin className="h-8 w-8" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="h-10 w-10 text-gray-400" />
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    <AnimatedCounter end={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                I am a Computer Science student with a strong focus on AI and ML, experienced in developing ML models
                and working on data-driven projects. I also have a background in web development, creating dynamic
                applications. Passionate about coding and problem-solving, I thrive in dynamic environments and am eager
                to apply my skills to impactful projects.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Brain className="h-16 w-16" />,
                  title: "AI & ML Specialist",
                  description:
                    "Expert in machine learning algorithms, deep learning, and AI-powered solutions with hands-on experience in TensorFlow, PyTorch, and scikit-learn.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Code className="h-16 w-16" />,
                  title: "Full-Stack Developer",
                  description:
                    "Proficient in modern web technologies including Python, Django, Flask, and database management with a focus on scalable applications.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: <Rocket className="h-16 w-16" />,
                  title: "Innovation Leader",
                  description:
                    "Leading tech teams in startups, driving innovation in AI-powered solutions, and mentoring fellow developers in emerging technologies.",
                  gradient: "from-green-500 to-teal-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        className={`mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r ${item.gradient} text-white shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {item.icon}
                      </motion.div>
                      <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          className="py-20 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Education
              </h2>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  degree: "B.Tech in Computer Science (AI & ML)",
                  institution: "Atlas Skilltech University",
                  period: "2024–2028",
                  current: true,
                },
                {
                  degree: "High School Education",
                  institution: "Ramniwas Bajaj High School",
                  period: "2017–2024",
                  current: false,
                },
                {
                  degree: "Primary Education",
                  institution: "Presidency School",
                  period: "2008–2017",
                  current: false,
                },
              ].map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    className={`border-l-4 ${edu.current ? "border-l-blue-500" : "border-l-gray-300"} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                            {edu.degree}
                          </CardTitle>
                          <CardDescription className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                            {edu.institution}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{edu.period}</span>
                          {edu.current && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Experience
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Internships</h3>
                <div className="space-y-6">
                  {experiences
                    .filter((exp) => exp.type === "Internship")
                    .map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
                          <CardHeader>
                            <div className="flex items-start gap-4">
                              <div
                                className={`p-3 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 ${exp.color}`}
                              >
                                {exp.icon}
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
                                  {exp.title}
                                </CardTitle>
                                <CardDescription className="text-base font-medium text-blue-600 dark:text-blue-400">
                                  {exp.company}
                                </CardDescription>
                                <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                                  <Calendar className="h-4 w-4" />
                                  <span className="text-sm">{exp.period}</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          {exp.description && (
                            <CardContent>
                              <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                            </CardContent>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Startups</h3>
                <div className="space-y-6">
                  {experiences
                    .filter((exp) => exp.type === "Startup")
                    .map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-purple-50 dark:from-gray-800 dark:to-gray-900">
                          <CardHeader>
                            <div className="flex items-start gap-4">
                              <div
                                className={`p-3 rounded-lg bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 ${exp.color}`}
                              >
                                {exp.icon}
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
                                  {exp.title}
                                </CardTitle>
                                <CardDescription className="text-base font-medium text-purple-600 dark:text-purple-400">
                                  {exp.company}
                                </CardDescription>
                                <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                                  <Calendar className="h-4 w-4" />
                                  <span className="text-sm">{exp.period}</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          {exp.description && (
                            <CardContent>
                              <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                            </CardContent>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 px-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Innovative solutions combining AI, machine learning, and full-stack development
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white dark:bg-gray-800">
                    <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${project.gradient} text-white shadow-lg`}>
                          {project.icon}
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-300 border-2"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Project
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {project.icon}
                              {project.title}
                            </DialogTitle>
                            <DialogDescription className="text-base">
                              Please contact Parth if you want to try this project! He'll be happy to provide a demo or
                              discuss the technical details.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex gap-4 mt-6">
                            <Button
                              asChild
                              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                              <a href="mailto:parthparmar4015@gmail.com?subject=Project%20Demo%20Request">
                                <Mail className="h-4 w-4 mr-2" />
                                Contact Parth
                              </a>
                            </Button>
                            <Button asChild variant="outline" className="flex-1">
                              <a href="https://linkedin.com/in/parthparmar04" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4 mr-2" />
                                LinkedIn
                              </a>
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Technical Skills
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Programming Languages",
                  icon: <Code className="h-8 w-8" />,
                  skills: skills.languages,
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Frameworks & Libraries",
                  icon: <Rocket className="h-8 w-8" />,
                  skills: skills.frameworks,
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  title: "Tools & Technologies",
                  icon: <Brain className="h-8 w-8" />,
                  skills: skills.tools,
                  gradient: "from-green-500 to-teal-500",
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800">
                    <CardHeader className="text-center">
                      <div
                        className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r ${category.gradient} text-white shadow-lg`}
                      >
                        {category.icon}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge
                              variant="outline"
                              className="text-sm py-2 px-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-default"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Leadership Section */}
        <section
          id="certifications"
          className="py-20 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Certifications & Leadership
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-xl bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Award className="h-6 w-6" />
                      </div>
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        "Google: Gen AI, LLMs, Responsible AI, Code Vipassana S10",
                        "IIT Roorkee: Quantum Computing",
                        "DeepLearning.ai: AI Coding Agents, Chatbots",
                        "SimpliLearn: Retrieval-Augmented Generation (RAG)",
                        "Tata Group: Data Visualization",
                      ].map((cert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-xl bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                        <Users className="h-6 w-6" />
                      </div>
                      Leadership & Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        "3-Year Group Leader for EUMIND (Europe Meets India)",
                        "Public Speaker at BAPS events",
                        "Pinewood Derby Car Challenge participant",
                        "ISDC 2025 Drone Challenge @ BITS Goa",
                        "AI/ML hackathons participant",
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                        >
                          <Zap className="h-5 w-5 text-purple-500" />
                          <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Ready to collaborate on innovative AI/ML projects or discuss exciting opportunities? Let's build
                something amazing together!
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                      Contact Information
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Feel free to reach out through any of these channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">Email</div>
                        <a
                          href="mailto:parthparmar4015@gmail.com"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          parthparmar4015@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <Linkedin className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">LinkedIn</div>
                        <a
                          href="https://linkedin.com/in/parthparmar04"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          linkedin.com/in/parthparmar04
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">Location</div>
                        <span className="text-gray-600 dark:text-gray-300">Mumbai, India</span>
                      </div>
                    </motion.div>

                    <div className="pt-6">
                      <Button
                        onClick={handleResumeClick}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Request Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <MessageCircle className="h-6 w-6" />
                      Send a Message
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      I'll get back to you as soon as possible!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div>
                        <Input
                          name="name"
                          placeholder="Your Name"
                          required
                          className="border-2 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          required
                          className="border-2 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <Textarea
                          name="message"
                          placeholder="Your Message"
                          rows={5}
                          required
                          className="border-2 focus:border-blue-500 transition-colors resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3"
                      >
                        <Mail className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Parth Parmar
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  AI & ML Engineer passionate about creating innovative solutions that make a difference.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center gap-6 mb-8"
              >
                <motion.a
                  href="mailto:parthparmar4015@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Mail className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/parthparmar04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="border-t border-gray-700 pt-8"
              >
                <p className="text-gray-400">
                  © 2025 Parth Parmar. Built with Next.js, Tailwind CSS, and Framer Motion.
                </p>
              </motion.div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
