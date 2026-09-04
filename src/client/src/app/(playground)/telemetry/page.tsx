"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ObservabilitySignalList from "@/components/(playground)/observability/signal-list";
import {
	OBSERVABILITY_SIGNALS,
	getSignalConfig,
} from "@/components/(playground)/observability/registry";
import { usePostHog } from "posthog-js/react";
import { CLIENT_EVENTS } from "@/constants/events";
import FeaturePageHeader from "@/components/(playground)/feature-page-header";
import getMessage from "@/constants/messages";

export default function TelemetryPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const posthog = usePostHog();
	const activeTab = "traces";
	const activeConfig = getSignalConfig(activeTab);
	const ActiveIcon = activeConfig.icon;

	useEffect(() => {
		posthog?.capture(CLIENT_EVENTS.OBSERVABILITY_PAGE_VISITED, {
			tab: activeConfig.key,
		});
	}, [activeConfig.key, posthog]);

	useEffect(() => {
		if (searchParams.get("tab") && searchParams.get("tab") !== "traces") {
			const params = new URLSearchParams(searchParams.toString());
			params.set("tab", "traces");
			router.replace(`/telemetry?${params.toString()}`, { scroll: false });
		}
	}, [router, searchParams]);

	return (
		<div className="flex h-full w-full flex-col overflow-hidden">
			<FeaturePageHeader
				eyebrow={getMessage().SIDEBAR_MONITOR}
				title={activeConfig.label}
				icon={<ActiveIcon className="h-4 w-4" />}
				tone={activeConfig.tone}
				actions={(
					<div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-end">
						{/* The Coding Sessions + Coding Users signal
						    configs stay registered (the per-vendor
						    detail page still embeds them via
						    <ObservabilitySignalList>), but we hide
						    them from this top nav: the Telemetry
						    page is the cross-signal generic surface,
						    and the dedicated coding-agent hub at
						    /agents is where users go for those
						    drilldowns. */}
						{OBSERVABILITY_SIGNALS.filter((signal) => signal.key === "traces").map((signal) => {
							const Icon = signal.icon;
							const isActive = signal.key === activeConfig.key;
							return (
								<button
									key={signal.key}
									className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition ${isActive
											? signal.tone
											: "border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
										}`}
								>
									<Icon className="h-4 w-4" />
									<span className="font-medium">{signal.label}</span>
								</button>
							);
						})}
					</div>
				)}
			/>
			<section className="min-h-0 flex-1 overflow-auto bg-white p-4 dark:bg-stone-950">
				<ObservabilitySignalList key={activeConfig.key} config={activeConfig} />
			</section>
		</div>
	);
}
