'use client'
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const usePlanSubscribe = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Payment method selection state
    const [selectedMethod, setSelectedMethod] = useState('');
    const { user, isAuthenticated, userProfile } = useSelector((state) => state.auth);
    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/plans/${id}?populate=*`);
                const planData = response.data.data;

                // Transform the plan data to match your expected format
                const transformedPlan = {
                    id: planData.id,
                    documentId: planData?.documentId,
                    name: planData.name,
                    price: planData.price,
                    description: planData.billing_period,
                    isPopular: planData.isPopular,
                    buttonText: planData.buttonText || "Choose Plan",
                    features: [
                        planData.fast_genaration,
                        planData.relaxed_generation,
                        planData.commercial_terms,
                        planData.member_gallery_access ? "Access to member gallery" : "",
                        planData.credit_top_ups ? "Optional credit top ups" : "",
                        `${planData.concurrent_fast_jobs} concurrent fast jobs`
                    ].filter(Boolean)
                };

                setPlan(transformedPlan);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching plan:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPlan();
        }
    }, [id]);

    return {
        plan,
        loading,

        error,
        selectedMethod,
        user,
        setSelectedMethod,
        isAuthenticated,
        userProfile

    }
}