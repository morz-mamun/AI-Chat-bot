// Sample product data for the chatbot to reference
const productData = [
  {
    id: "premium-plan",
    name: "Premium Plan",
    description: "Our most popular subscription plan with all features included.",
    price: "$49.99/month",
    features: [
      "Unlimited access to all products",
      "24/7 priority support",
      "Advanced analytics",
      "Custom integrations",
    ],
    faq: [
      {
        question: "Can I cancel my Premium Plan anytime?",
        answer:
          "Yes, you can cancel your Premium Plan at any time. Your subscription will remain active until the end of your current billing cycle.",
      },
      {
        question: "Is there a free trial for the Premium Plan?",
        answer: "Yes, we offer a 14-day free trial for our Premium Plan. No credit card required.",
      },
    ],
  },
  {
    id: "basic-plan",
    name: "Basic Plan",
    description: "Perfect for individuals and small teams getting started.",
    price: "$19.99/month",
    features: ["Access to core features", "Email support", "Basic analytics", "5 user accounts"],
    faq: [
      {
        question: "What's the difference between Basic and Premium plans?",
        answer:
          "The Basic Plan includes core features with limited user accounts, while the Premium Plan offers unlimited access, priority support, and advanced features.",
      },
      {
        question: "Can I upgrade from Basic to Premium later?",
        answer:
          "Yes, you can upgrade to the Premium Plan at any time. Your billing will be prorated for the remainder of your current cycle.",
      },
    ],
  },
  {
    id: "enterprise-plan",
    name: "Enterprise Plan",
    description: "Tailored solutions for large organizations with custom needs.",
    price: "Contact sales for pricing",
    features: [
      "Custom feature development",
      "Dedicated account manager",
      "SLA guarantees",
      "Unlimited users and storage",
      "On-premise deployment options",
    ],
    faq: [
      {
        question: "How do I get started with the Enterprise Plan?",
        answer:
          "Contact our sales team at sales@example.com to schedule a consultation. We'll create a custom package based on your organization's specific needs.",
      },
      {
        question: "Do you offer training for Enterprise customers?",
        answer: "Yes, all Enterprise plans include personalized onboarding and training sessions for your team.",
      },
    ],
  },
  {
    id: "returns",
    name: "Return Policy",
    description: "Our standard return policy for physical products.",
    details:
      "We accept returns within 30 days of purchase. Items must be in original condition with all packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
  },
  {
    id: "shipping",
    name: "Shipping Information",
    description: "Shipping options and delivery timeframes.",
    details:
      "We offer standard shipping (3-5 business days), expedited shipping (2 business days), and overnight shipping options. Free standard shipping on orders over $50. International shipping available to select countries.",
  },
]

// Function to search product data based on user query
export function getProductInfo(query: string): string[] {
  const normalizedQuery = query.toLowerCase()
  const results: string[] = []

  // Simple keyword matching
  productData.forEach((product) => {
    let isRelevant = false

    // Check product name and description
    if (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
    ) {
      isRelevant = true
    }

    // Check for price-related queries
    if (normalizedQuery.includes("price") || normalizedQuery.includes("cost") || normalizedQuery.includes("pricing")) {
      if (product.price) {
        isRelevant = true
      }
    }

    // Check for plan-specific queries
    if (
      (normalizedQuery.includes("premium") && product.id === "premium-plan") ||
      (normalizedQuery.includes("basic") && product.id === "basic-plan") ||
      (normalizedQuery.includes("enterprise") && product.id === "enterprise-plan")
    ) {
      isRelevant = true
    }

    // Check for shipping or return queries
    if (
      ((normalizedQuery.includes("return") || normalizedQuery.includes("refund")) && product.id === "returns") ||
      ((normalizedQuery.includes("shipping") || normalizedQuery.includes("delivery")) && product.id === "shipping")
    ) {
      isRelevant = true
    }

    // Add relevant product info to results
    if (isRelevant) {
      let info = `Product: ${product.name}\n`
      info += `Description: ${product.description}\n`

      if (product.price) {
        info += `Price: ${product.price}\n`
      }

      if (product.features) {
        info += `Features: ${product.features.join(", ")}\n`
      }

      if (product.details) {
        info += `Details: ${product.details}\n`
      }

      // Add FAQ if available and relevant
      if (product.faq) {
        const relevantFaqs = product.faq.filter(
          (faq) =>
            faq.question.toLowerCase().includes(normalizedQuery) || faq.answer.toLowerCase().includes(normalizedQuery),
        )

        if (relevantFaqs.length > 0) {
          info += "FAQ:\n"
          relevantFaqs.forEach((faq) => {
            info += `Q: ${faq.question}\nA: ${faq.answer}\n`
          })
        }
      }

      results.push(info)
    }
  })

  // Return top 3 most relevant results
  return results.slice(0, 3)
}
