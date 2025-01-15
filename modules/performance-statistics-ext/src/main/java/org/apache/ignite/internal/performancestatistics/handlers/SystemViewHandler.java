package org.apache.ignite.internal.performancestatistics.handlers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.ignite.internal.util.typedef.internal.U;

import static org.apache.ignite.internal.performancestatistics.util.Utils.MAPPER;
import static org.apache.ignite.internal.processors.platform.memory.PlatformMemoryUtils.data;

public class SystemViewHandler implements IgnitePerformanceStatisticsHandler {
    private final Map<UUID, Map<String, List<Map<String, String>>>> results = new TreeMap<>();

    @Override public Map<String, JsonNode> results() {
        ObjectNode objectNode = MAPPER.createObjectNode();
        results.forEach((id, view) -> {
            ObjectNode viewObjectNode = MAPPER.createObjectNode();
            view.forEach((viewName, table) -> {
                ArrayNode arrayNode = MAPPER.createArrayNode();
                for (Map<String, String> row : table) {
                    ObjectNode rowNode = MAPPER.createObjectNode();
                    for (Map.Entry<String, String> entry : row.entrySet())
                        rowNode.put(entry.getKey(), entry.getValue());
                    arrayNode.add(rowNode);
                }
                viewObjectNode.set(viewName, arrayNode);
            });
            objectNode.set(id.toString(), viewObjectNode);
        });

        return U.map("systemView", objectNode);
    }

    @Override public void systemView(UUID id, String name, Map<String, String> row) {
        results.computeIfAbsent(id, uuid -> new TreeMap<>())
            .computeIfAbsent(name, string -> new ArrayList<>())
            .add(new TreeMap<>(row));
    }
}
